"use client";
import { useState } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import { Department } from "./models/department";
import departments from "./data/departments";
import { State } from "./models/state";
import states from "./data/states";

export default function Home() {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [departmentOption, setDepartmentOption] = useState<Department | null>(
    null
  );
  const [stateOption, setStateOption] = useState<State | null>(null);

  const departmentOptions = departments;
  const stateOptions = states;

  return (
    <main className="p-6">
      <div className="max-w-xs mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2">HRnet</h1>
          <Link
            href="employee-list"
            className="mb-2 underline text-blue-500 hover:text-blue-700 visited:text-purple-700"
          >
            View Current Employees
          </Link>
          <h2 className="text-xl font-bold mb-2">Create Employee</h2>
        </div>
        <form action="#" className="flex flex-col py-6">
          <div className="input-group">
            <label className="label" htmlFor="first-name">
              First Name
            </label>
            <input id="first-name" type="text" className="input" />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="last-name">
              Last Name
            </label>
            <input id="last-name" type="text" className="input" />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="date-of-birth">
              Date of Birth
            </label>
            <DatePicker
              id="date-of-birth"
              className="input"
              selected={dateOfBirth}
              showMonthDropdown
              showYearDropdown
              onChange={(date: Date) => setDateOfBirth(date)}
              maxDate={new Date()}
            />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="start-date">
              Start Date
            </label>
            <DatePicker
              id="start-date"
              className="input"
              selected={startDate}
              showMonthDropdown
              showYearDropdown
              onChange={(date: Date) => setStartDate(date)}
            />
          </div>

          <fieldset className="flex flex-col p-6 border border-gray-300">
            <legend className="label">Address</legend>

            <div className="input-group">
              <label className="label" htmlFor="street">
                Street
              </label>
              <input id="street" type="text" className="input" />
            </div>

            <div className="input-group">
              <label className="label" htmlFor="city">
                City
              </label>
              <input id="city" type="text" className="input" />
            </div>

            <div className="input-group">
              <label className="label" htmlFor="state">
                State
              </label>
              <Select
                name="state"
                id="state"
                className="mt-1"
                value={stateOption}
                options={stateOptions}
                onChange={setStateOption}
              />
            </div>

            <div className="input-group mb-0">
              <label className="label" htmlFor="zip-code">
                Zip Code
              </label>
              <input id="zip-code" type="number" className="input" />
            </div>
          </fieldset>

          <div className="input-group">
            <label className="label" htmlFor="department">
              Department
            </label>
            <Select
              name="department"
              id="department"
              className="mt-1"
              value={departmentOption}
              options={departmentOptions}
              onChange={setDepartmentOption}
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="py-2 px-6 rounded-lg bg-slate-800 text-white hover:bg-slate-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
