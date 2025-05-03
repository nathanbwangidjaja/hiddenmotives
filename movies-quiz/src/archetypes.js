// src/archetypes.js
export const archetypes = [
    {
      name: "The Obsessive Investigator",
      x: 8,  // High drive
      y: 2,  // Low aggression
      z: 8,  // Highly analytical
      desc: "You zero in on every inconsistency and inspect every clue like a true detective. Driven by an almost compulsive need to uncover the truth, you investigate to the smallest detail even when everyone around you is ready to move on. Justice is a mission that steers your decisions. When obstacles block your path, you can feel your temper rise, and you may bend rules you normally hold sacred. Your greatest strength is precision. Your greatest risk is letting your frustration take over your principles.",
      img: "/archetypes/obsessive-investigator.png"
    },
    {
      name: "The Intuitive Enforcer",
      x: 4,  // Moderate drive
      y: 6,  // High aggression
      z: 0,  // Highly impulsive
      desc: "You are best in times of uncertainty. You follow your gut when logic and reasoning fails. Speed matters more than subtlety - you'd rather act fast and explain everything later. You see situations in black and white. If there are problems ready to be solved, you are the one to do it. Rules are guidelines but are not unbreakable. You will bend and break them if it means you can solve a situation quickly. You understand that force can be used as a tool to lead the way to a solution. Your courage is inspiring to others, but your impulsiveness can be your downfall.",
      img: "/archetypes/intuitive-enforcer.png"
    },
    {
      name: "The Paranoid Savior",
      x: 8,  // High drive
      y: 8,  // High aggression
      z: 2,  // Low analytical, high urgency
      desc: "You burden a conviction that catastrophe is inevitable. Every whisper, every shadow, every misstep in the world confirms your worst fears. You do not wait for proof before taking action. You build defenses where none seem necessary and stockpile plans for threats real or imagined. Violence is not your first choice, but in your mind it is usually the only way to avoid disaster. Beyond your urgency is a wounded heart - stemming from past betrayals and traumas that you dare not forget",
      img: "/archetypes/paranoid-savior.png"
    },
    {
      name: "The Calculated Manipulator",
      x: 2,  // Low drive
      y: 2,  // Low aggression
      z: 6,  // Highly strategic
      desc: "You overlook the web of relationships and power with a cool eye. Your moves are articulate, never random. Each interaction is for a greater purpose. You prize self-preservation above all, but you hide your ambition behind a facade of amiability and reason. When needed, you outsource the dirty work. You would rather pull strings than swing the sword. Your calmness inspires trust - even when your true goals cause others to hesitate. Strategy is a must while moral absolutes are often negotiable. ",
      img: "/archetypes/calculated-manipulator.png"
    },
    {
      name: "The Devoted Protector",
      x: 6,  // High drive
      y: 4,  // Moderate aggression
      z: 4,  // Balanced approach
      desc: "You walk through life sheltered in loyalty. At the first hint of danger to those you love, you become a wall. You are creative, resourceful and tireless for those you love. You do not immediately seek confrontation but are willing to stand in between harm and the vulnerable with unwavering resolve. You have both courage and care, knowing well that a measured response often saves more lives than blind aggression. You have one goal: keep your loved ones safe. When this goal is in jeopardy, you do not hesitate to face violence with violence.",
      img: "/archetypes/devoted-protector.png"
    },
    {
      name: "The Reluctant Warrior",
      x: 4,  // Moderate drive
      y: 4,  // Moderate aggression
      z: 4,  // Balanced approach
      desc: "You prioritize peace and like to avoid conflict. However, when lines are crossed, you are willing to fight. It is a burden you bear out of duty and necessity. You often wrestle with the moral weight of every strike and seek redemption through each act of defense. Violence feels like a double edges sword to you. You gain protection but lose innocence. Your path involves learning when to lower your guard and when to draw your sword.",
      img: "/archetypes/reluctant-warrior.png"
    },
    {
      name: "The Persistent Survivor",
      x: 0,  // Low drive
      y: 0,  // Low aggression
      z: 6,  // Strategic endurance
      desc: "You are the type of person to keep moving forward with quiet determination. You are not the loudest advocate for change nor are you the first to pick up a weapon but your resilience speaks volumes. You hold tightly to freedom and dignity and you go through hardships with patience. Violence is only ever a last resort - one you hope you will never have to take. Your power lies in your steadfastness and others follow your unbreakable will.",
      img: "/archetypes/persistent-survivor.png"
    },
    {
      name: "The Charismatic Leader",
      x: 6,  // High drive
      y: 6,  // High aggression
      z: 4,  // Balanced but inspiring
      desc: "You see possibility even in times of despair. Your vision rallies people to your side and your conviction transforms doubt into action. Violence is an instrument of revolution used to topple unjust structures. You like to plan out grand ideals -- almost like a strategist. Your greatest trait is inspiring unity. Your greatest temptation is ensuring that unity is ethical ",
      img: "/archetypes/charismatic-leader.png"
    }
  ];
  
  // Three-dimensional Euclidean matching
  export function getBestMatch({ desire, violence, approach }, totalQuestions = 20) {
    // Normalize raw sums (range -totalQuestions...+totalQuestions) to 0...8
    const norm = v => ((v + totalQuestions) / (2 * totalQuestions)) * 8;
    const dx = norm(desire);
    const dy = norm(violence);
    const dz = norm(approach);
  
    let best = { archetype: null, dist: Infinity };
    for (const a of archetypes) {
      const dist = Math.hypot(dx - a.x, dy - a.y, dz - a.z);
      if (dist < best.dist) {
        best = { archetype: a, dist };
      }
    }
    return best.archetype;
  }
  