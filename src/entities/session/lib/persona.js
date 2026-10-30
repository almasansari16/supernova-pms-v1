/* Demo identity shown for each role (greeting, avatar, profile menu) */
const PERSONAS = {
  Operator: { name:"Faisal Karim", first:"Faisal", initials:"FK" },
  QA:       { name:"Ayesha Noor",  first:"Ayesha", initials:"AN" },
};
const DEFAULT_PERSONA = { name:"Nabeel Ahmed", first:"Nabeel", initials:"NA" };

export const getPersona = (role) => PERSONAS[role] || DEFAULT_PERSONA;
