"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { selectEmployees, useAppSelector } from "../redux/selectors";
import { getCodeFromState } from "../utils/utils";
import { Employee } from "../models/employee";
import DataTable from "react-data-table-component";

export const metadata: Metadata = {
  title: "HRnet - Employees",
  description: "List of all employees",
};

export default function EmployeeList() {
  const employeesStore = useAppSelector(selectEmployees);
  const [isLoading, setIsLoading] = useState(true);
  let employeesDatas: Employee[] = employeesStore.employees;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const columns = [
    {
      name: "First Name",
      selector: (employee: Employee) =>
        employee.first_name ? employee.first_name : "",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (employee: Employee) =>
        employee.last_name ? employee.last_name : "",
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (employee: Employee) =>
        employee.employment && employee.employment.start_date
          ? employee.employment.start_date
          : "",
      sortable: true,
    },
    {
      name: "Department",
      selector: (employee: Employee) =>
        employee.employment && employee.employment.department
          ? employee.employment.department
          : "",
      sortable: true,
    },
    {
      name: "Date of birth",
      selector: (employee: Employee) =>
        employee.date_of_birth ? employee.date_of_birth : "",
      sortable: true,
    },
    {
      name: "Street",
      selector: (employee: Employee) =>
        employee.address && employee.address.street
          ? employee.address.street
          : "",
      sortable: true,
    },
    {
      name: "City",
      selector: (employee: Employee) =>
        employee.address && employee.address.city ? employee.address.city : "",
      sortable: true,
    },
    {
      name: "State",
      selector: (employee: Employee) =>
        employee.address && employee.address.state
          ? getCodeFromState(employee.address.state)
          : "",
      sortable: true,
    },
    {
      name: "ZIP Code",
      selector: (employee: Employee) =>
        employee.address && employee.address.zip_code
          ? employee.address.zip_code
          : "",
      sortable: true,
    },
  ];

  return (
    <main className="p-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2">Current Employees</h1>
        </div>
        <DataTable
          columns={columns}
          data={employeesDatas}
          pagination
          progressPending={isLoading}
          className="mt-2"
          striped
        />
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
