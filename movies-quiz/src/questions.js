// src/questions.js
const baseQuestions = [
    {
      id: 1,
      text: "When you hear rumors of a crime in your community, you...",
      options: [
        {
          text: "Conduct thorough research before taking action",
          desire: 2,
          violence: -2,
          approach: 2,
          nextId: 2
        },
        {
          text: "Confront suspects directly, using intimidation if needed",
          desire: -1,
          violence: 2,
          approach: -2,
          nextId: 2
        },
        {
          text: "Assume it's none of your business and walk away",
          desire: 0,
          violence: 0,
          approach: 0,
          nextId: 2
        }
      ]
    },
    {
      id: 2,
      text: "Under extreme stress, you find that you...",
      options: [
        {
          text: "Hold to your principles and follow the book exactly",
          desire: 1,
          violence: -2,
          approach: 2,
          nextId: 3
        },
        {
          text: "Bend rules quietly to achieve what you believe is right",
          desire: 2,
          violence: 1,
          approach: 0,
          nextId: 3
        },
        {
          text: "Explode in anger and use force to solve problems",
          desire: -2,
          violence: 2,
          approach: -2,
          nextId: 3
        }
      ]
    },
    {
      id: 3,
      text: "Your family is in danger. Your priority is to...",
      options: [
        {
          text: "Plan a careful strategy to rescue them unharmed",
          desire: 2,
          violence: -2,
          approach: 2,
          nextId: 4
        },
        {
          text: "Rush in and fight off any threat head-on",
          desire: 1,
          violence: 2,
          approach: -2,
          nextId: 4
        },
        {
          text: "Try to negotiate payment or peaceful surrender",
          desire: 1,
          violence: 0,
          approach: 0,
          nextId: 4
        }
      ]
    },
    {
      id: 4,
      text: "You suspect a colleague of betrayal. You...",
      options: [
        {
          text: "Gather concrete evidence before you accuse them",
          desire: 2,
          violence: 0,
          approach: 2,
          nextId: 5
        },
        {
          text: "Confront them aggressively to force a confession",
          desire: 1,
          violence: 2,
          approach: -2,
          nextId: 5
        },
        {
          text: "Spread rumors to isolate them without direct conflict",
          desire: 0,
          violence: 1,
          approach: 0,
          nextId: 5
        }
      ]
    },
    {
      id: 5,
      text: "When it comes to using violence, you believe it is...",
      options: [
        {
          text: "A last resort only to protect others",
          desire: 2,
          violence: 1,
          approach: 0,
          nextId: 6
        },
        {
          text: "An acceptable tool to quickly achieve goals",
          desire: 1,
          violence: 2,
          approach: -2,
          nextId: 6
        },
        {
          text: "Never justified; seek peaceful alternatives always",
          desire: 2,
          violence: -2,
          approach: 2,
          nextId: 6
        }
      ]
    }
  ];
  
  export default baseQuestions;
  