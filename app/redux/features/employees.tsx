import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppGetState } from "../store";
import { selectEmployees } from "../selectors";
import { Employee } from "@/app/models/employee";
import users from "@/app/data/users";

type EmployeesState = {
  status: string;
  error: null | string;
  employees: Employee[];
};

// Initial state
const initialState: EmployeesState = {
  status: "",
  error: null,
  employees: users,
};

// MiddleWare
export function addEmployee(employee: Employee) {
  return function (dispatch: AppDispatch, getState: AppGetState) {
    const status = selectEmployees(getState()).status;
    if (status === "pending") {
      return;
    }
    dispatch(actions.pending());
    // TODO check employee?
    // If ok:
    dispatch(actions.resolved(employee));
    // Else:
    //dispatch(actions.rejected(error));
  };
}

// Slice
const employees = createSlice({
  name: "employees",
  initialState,
  reducers: {
    pending: (draft) => {
      if (draft.status === "rejected") {
        draft.error = null;
      }
      draft.status = "pending";
      return;
    },
    resolved: (draft, action: PayloadAction<Employee>) => {
      draft.status = "resolved";
      draft.employees.push(action.payload);
    },
    rejected: (draft, action: PayloadAction<string>) => {
      draft.status = "rejected";
      draft.error = action.payload;
    },
  },
});

export const { actions } = employees;
export default employees.reducer;
