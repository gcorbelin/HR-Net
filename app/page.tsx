"use client";
import { forwardRef, useState } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

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
              <select name="state" id="state" className="input"></select>
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
            <select name="department" id="department" className="input">
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
            </select>
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
