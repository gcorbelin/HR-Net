"use client";
import Link from "next/link";
import { Metadata } from "next";
import { selectEmployees, useAppSelector } from "../redux/selectors";
import { getCodeFromState } from "../utils/utils";

export const metadata: Metadata = {
  title: "HRnet - Employees",
  description: "List of all employees",
};

export default function EmployeeList() {
  const employeesStore = useAppSelector(selectEmployees);
  const employees = employeesStore.employees.map((employee) => {
    return (
      <tr key={employee.id}>
        <td>{employee.first_name}</td>
        <td>{employee.last_name}</td>
        <td>{employee.employment.start_date}</td>
        <td>{employee.employment.department}</td>
        <td>{employee.date_of_birth}</td>
        <td>{employee.address.street}</td>
        <td>{employee.address.city}</td>
        <td>{getCodeFromState(employee.address.state)}</td>
        <td>{employee.address.zip_code}</td>
      </tr>
    );
  });

  return (
    <main className="p-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2">Current Employees</h1>
        </div>
        <table className="mb-2">
          <thead>
            <tr>
              <th>first_name</th>
              <th>last_name</th>
              <th>start_date</th>
              <th>department</th>
              <th>date_of_birth</th>
              <th>street</th>
              <th>city</th>
              <th>address.state</th>
              <th>zip_code</th>
            </tr>
          </thead>
          <tbody>{employees}</tbody>
        </table>
        <div className="flex flex-col items-center">
          <Link
            href="/"
            className="underline text-blue-500 hover:text-blue-700 visited:text-purple-700"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
