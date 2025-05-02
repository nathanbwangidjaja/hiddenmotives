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
You are an expert quiz designer creating a personality-quiz game around two axes: Desire and Violence, inspired by three Korean films and their key archetypes:

• Memories of Murder  
  1. The Obsessive Investigator: Analytical, principled, emotionally volatile; Desire=Truth & justice; Violence=Suppressed until provoked  
  2. The Intuitive Enforcer: Instinct-driven, impulsive; Desire=Quick resolution; Violence=Utilized as a tool  

• Save the Green Planet  
  3. The Paranoid Savior: Delusional, trauma-driven; Desire=To save the world; Violence=Justified by perceived threats  
  4. The Calculated Manipulator: Composed, strategic; Desire=Self-preservation; Violence=Delegated or indirect  

• The Battleship Island  
  5. The Devoted Protector: Caring, resourceful; Desire=Family’s safety; Violence=When loved ones threatened  
  6. The Reluctant Warrior: Tough, loyal; Desire=Personal redemption; Violence=A means to an end  
  7. The Persistent Survivor: Enduring, hopeful; Desire=Freedom & dignity; Violence=Avoided unless necessary  
  8. The Charismatic Leader: Inspirational, strategic; Desire=Collective liberation; Violence=Directed toward systemic change  

Using the user’s first ${answers.length} answers (shown below), generate exactly ${count} additional quiz questions numbered ${startId} through ${total}, inclusive.

Each question must be a valid JSON object:
- id: the question number  
- text: the question prompt  
- options: an array of **3** answer choices, each with:
  * text: the answer text  
  * desire: integer (Desire weight)  
  * violence: integer (Violence weight)  
  * nextId: id + 1 (or null if id == ${total})  

Here are the user’s previous answers:
${answers.map(a => `Q${a.questionId}: "${a.choice}" (desire=${a.desire}, violence=${a.violence})`).join("\n")}

Output ONLY valid JSON: a pure array of exactly ${count} objects, no markdown, no explanation.
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

    // 🧼 Strip markdown code fences
    if (text.startsWith("```")) {
      text = text.replace(/^```(?:json)?\s*/, "").replace(/```$/, "").trim();
    }

    console.log("← raw AI output:", text);

    const questions = JSON.parse(text);

    // 🛡 Validate array length
    if (!Array.isArray(questions)) throw new Error("AI output is not an array");
    if (questions.length !== count) {
      throw new Error(`Expected ${count} questions but got ${questions.length}`);
    }

    // 🔍 Validate each question's schema
    questions.forEach((q, i) => {
      if (!q.id || typeof q.text !== "string" || !Array.isArray(q.options) || q.options.length !== 3) {
        throw new Error(`Malformed question at index ${i} (ID ${q.id})`);
      }

      q.options.forEach((opt, j) => {
        if (
          typeof opt.text !== "string" ||
          typeof opt.desire !== "number" ||
          typeof opt.violence !== "number" ||
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
