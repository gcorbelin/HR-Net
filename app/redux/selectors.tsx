import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

// Overrides useSelector hook for typescript
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Create selectors
export const selectEmployees = (state: RootState) => {
  return state.employeesReducer;
};
