// src/archetypes.js
import obsessiveInvestigator from "./archetypes/obsessive-investigator.png";
import intuitiveEnforcer from "./archetypes/intuitive-enforcer.png";
import paranoidSavior from "./archetypes/paranoid-savior.png";
import calculatedManipulator from "./archetypes/calculated-manipulator.png";
import devotedProtector from "./archetypes/devoted-protector.png";
import reluctantWarrior from "./archetypes/reluctant-warrior.png";
import persistentSurvivor from "./archetypes/persistent-survivor.png";
import charismaticLeader from "./archetypes/charismatic-leader.png";


export const archetypes = [
    {
      name: "The Obsessive Investigator",
      x: 8,  // High drive
      y: 2,  // Low aggression
      z: 8,  // Highly analytical
      desc: "You dissect every clue with precision, driven more by logic than emotion.",
      img: obsessiveInvestigator
    },
    {
      name: "The Intuitive Enforcer",
      x: 4,  // Moderate drive
      y: 6,  // High aggression
      z: 0,  // Highly impulsive
      desc: "You trust your gut and move swiftly, often acting before you fully think things through.",
      img: intuitiveEnforcer
    },
    {
      name: "The Paranoid Savior",
      x: 8,  // High drive
      y: 8,  // High aggression
      z: 2,  // Low analytical, high urgency
      desc: "You perceive threats everywhere and respond with force, guided by fear more than strategy.",
      img: paranoidSavior
    },
    {
      name: "The Calculated Manipulator",
      x: 2,  // Low drive
      y: 2,  // Low aggression
      z: 6,  // Highly strategic
      desc: "Your every move is part of a hidden plan; you prefer to pull strings from the shadows.",
      img: calculatedManipulator
    },
    {
      name: "The Devoted Protector",
      x: 6,  // High drive
      y: 4,  // Moderate aggression
      z: 4,  // Balanced approach
      desc: "Your loyalty to loved ones fuels you; you mix courage with a measured hand.",
      img: devotedProtector
    },
    {
      name: "The Reluctant Warrior",
      x: 4,  // Moderate drive
      y: 4,  // Moderate aggression
      z: 4,  // Balanced approach
      desc: "You step into conflict only when necessary, balancing conviction with restraint.",
      img: reluctantWarrior
    },
    {
      name: "The Persistent Survivor",
      x: 0,  // Low drive
      y: 0,  // Low aggression
      z: 6,  // Strategic endurance
      desc: "You endure challenges quietly, preferring careful patience over confrontation.",
      img: persistentSurvivor
    },
    {
      name: "The Charismatic Leader",
      x: 6,  // High drive
      y: 6,  // High aggression
      z: 4,  // Balanced but inspiring
      desc: "You rally others with vision and bold action, fusing passion with purpose.",
      img: charismaticLeader
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
  