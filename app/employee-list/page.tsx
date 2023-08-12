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
  const [filterText, setFilterText] = useState("");
  // Get datas from store
  const employeesDatas: Employee[] = employeesStore.employees;
  // Filter datas with search input
  const filteredItems = employeesDatas.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

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

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.currentTarget.value);
  };

  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };

  return (
    <main className="p-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2">Current Employees</h1>
        </div>
        <div className="flex justify-end mb-2">
          <div className="relative rounded-md shadow-sm">
            <input
              id="search"
              type="text"
              className="input pr-4 m-0"
              placeholder="Filter table data..."
              value={filterText}
              onChange={(event) => handleFilter(event)}
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center rounded-r-md bg-gray-100 px-3 h-100 border border-gray-300"
            >
              X
            </button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredItems}
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
