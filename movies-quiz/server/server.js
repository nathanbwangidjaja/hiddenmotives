// server/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.post("/api/generate-questions", async (req, res) => {
  console.log("→ /api/generate-questions body:", req.body);
  const { answers, total, axes } = req.body;
  const count = total - answers.length;
  const startId = answers.length + 1;

  console.log("count:", count);
  console.log("startId:", startId);
  console.log("total:", total);

  const prompt = `
    ***IMPORTANT: RETURN EXACTLY ${count} QUESTIONS IN A SINGLE JSON ARRAY, WITH NO SURROUNDING TEXT OR MARKDOWN.***

    These questions must be numbered *inclusive* from ${startId} through ${total}. Questions should feel thematically tied to the films and archetypes (Memories of Murder, Save the Green Planet, Battleship Island) but never mention the movies by name—use scenarios that echo those characters’ dilemmas
    The final question (id ${total}) must have "nextId": null. Each new question must logically follow from one of the user’s previous answers, deepening the narrative.

    Settings:
    - Axes: Desire (horizontal), Violence (vertical), Approach (diagonal)
    - Inspired by:
    • Memories of Murder → Obsessive Investigator & Intuitive Enforcer  
    • Save the Green Planet → Paranoid Savior & Calculated Manipulator  
    • The Battleship Island → Devoted Protector, Reluctant Warrior, Persistent Survivor, Charismatic Leader  

    User’s first ${answers.length} answers:
    ${answers.map(a => `Q${a.questionId}: "${a.choice}" (desire=${a.desire}, violence=${a.violence}, approach=${a.approach})`).join("\n")}

    For each of the ${count} questions:
    - id: integer from ${startId} to ${total}  
    - text: string  
    - options: array[4] of objects:
        * text: string  
        * desire: integer  
        * violence: integer  
        * approach: integer
        * nextId: id + 1 (or null if id == ${total})

    Output ONLY valid JSON:  
    \`\`\`json
    [ 
    { "id": 6, "text": "...", "options": [ ... ] },  
    …  
    { "id": ${total}, "text": "...", "options": [ … { "nextId": null } ] }  
    ]
    \`\`\`
    `.trim();


  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const resp = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You must output pure JSON: an array of question objects only." },
        { role: "user", content: prompt }
      ]
    });

    let text = resp.choices[0].message.content.trim();

    if (text.startsWith("```")) {
      text = text.replace(/^```(?:json)?\s*/, "").replace(/```$/, "").trim();
    }

    console.log("← raw AI output:", text);

    const questions = JSON.parse(text);

    if (!Array.isArray(questions)) throw new Error("AI output is not an array");
    if (questions.length !== count) {
      throw new Error(`Expected ${count} questions but got ${questions.length}`);
    }

    questions.forEach((q, i) => {
      if (!q.id || typeof q.text !== "string" || !Array.isArray(q.options) || q.options.length !== 3) {
        throw new Error(`Malformed question at index ${i} (ID ${q.id})`);
      }

      q.options.forEach((opt, j) => {
        if (
          typeof opt.text !== "string" ||
          typeof opt.desire !== "number" ||
          typeof opt.violence !== "number" ||
            typeof opt.approach !== "number" ||
          (opt.nextId !== null && typeof opt.nextId !== "number")
        ) {
          throw new Error(`Invalid option in question ${q.id}, option ${j + 1}`);
        }
      });
    });

    console.log("← parsed questions:", questions);
    return res.json(questions);

  } catch (err) {
    console.error("OpenAI error:", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ API listening on port ${PORT}`));
