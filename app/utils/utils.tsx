import states from "@/app/data/states";

export function getCodeFromState(state: string) {
  return states.filter((st) => st.label === state)[0]
    ? states.filter((st) => st.label === state)[0].value
    : "";
}

export function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}
