import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "@/app/redux/features/employees";

export const store = configureStore({
  reducer: { employeesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
