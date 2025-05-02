// src/archetypes.js

export const archetypes = [
    {
      name: "The Obsessive Investigator",
      x: 4,
      y: 1,
      desc: "You’re driven by a relentless need to examine every detail. Your meticulous approach often unveils hidden truths, but when obstacles arise, your frustration can cloud judgment."
    },
    {
      name: "The Intuitive Enforcer",
      x: 2,
      y: 3,
      desc: "You rely on instinct to guide your actions, cutting through complexity with quick decisions. While your boldness can rapidly resolve challenges, it sometimes sparks unintended conflict."
    },
    {
      name: "The Paranoid Savior",
      x: 4,
      y: 4,
      desc: "A sense of looming danger fuels your every move. You prepare for worst-case scenarios with unwavering conviction, even if it means acting on suspicions others deem unfounded."
    },
    {
      name: "The Calculated Manipulator",
      x: 1,
      y: 1,
      desc: "You plan several moves ahead, orchestrating events from behind the scenes. Your strategic calm belies a willingness to blur moral lines in pursuit of desired outcomes."
    },
    {
      name: "The Devoted Protector",
      x: 3,
      y: 2,
      desc: "The safety of those you care about defines your purpose. You adapt resourcefully to threats, often putting yourself at risk so others can stand aside, shielded from harm."
    },
    {
      name: "The Reluctant Warrior",
      x: 2,
      y: 2,
      desc: "You hesitate before conflict, but when forced into action, you draw on deep reserves of courage. Your struggle between restraint and force shapes your path to redemption."
    },
    {
      name: "The Persistent Survivor",
      x: 0,
      y: 0,
      desc: "You endure hardships with quiet strength, finding hope in even the bleakest circumstances. Your resilience allows you to navigate adversity without resorting to violence."
    },
    {
      name: "The Charismatic Leader",
      x: 3,
      y: 3,
      desc: "You inspire others with clarity of purpose and unwavering conviction. Your leadership fosters unity and drives collective efforts toward transformative change."
    }
  ];
  
  // Euclidean-distance matcher
  export function getBestMatch({ desire, violence }) {
    let best = { archetype: null, dist: Infinity };
    for (const a of archetypes) {
      const dx = desire   - a.x;
      const dy = violence - a.y;
      const dist = Math.hypot(dx, dy);
      if (dist < best.dist) {
        best = { archetype: a, dist };
      }
    }
    return best.archetype;
  }
  