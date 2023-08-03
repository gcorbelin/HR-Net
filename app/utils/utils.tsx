import states from "@/app/data/states";

export function getCodeFromState(state: string) {
  return states.filter((st) => st.name === state)[0].abbreviation;
}
