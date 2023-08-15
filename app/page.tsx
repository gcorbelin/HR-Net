"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import "react-datepicker/dist/react-datepicker.css";
import { Department } from "./models/department";
import departments from "./data/departments";
import { State } from "./models/state";
import states from "./data/states";
import { Employee } from "./models/employee";
import { uniqueID } from "./utils/utils";
import { addEmployee, resetState } from "./redux/features/employees";
import { selectEmployees, useAppSelector } from "./redux/selectors";
import { Modal } from "hr-net-ui";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [departmentOption, setDepartmentOption] = useState<Department | null>(
    null
  );
  const [stateOption, setStateOption] = useState<State | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const departmentOptions = departments;
  const stateOptions = states;

  const employeesStore = useAppSelector(selectEmployees);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEmployee: Employee = {
      id: uniqueID(),
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth.toISOString().split("T")[0],
      employment: {
        department: departmentOption?.value,
        start_date: startDate.toISOString().split("T")[0],
      },
      address: {
        street: street,
        city: city,
        zip_code: zip,
        state: stateOption?.label,
        country: "United States",
      },
    };
    dispatch(addEmployee(newEmployee));
  };

  const handleClose = () => {
    setIsOpen(false);
    dispatch(resetState());
  };

  useEffect(() => {
    switch (employeesStore.status) {
      case "resolved":
        setModalContent("Employee Created!");
        setIsOpen(true);
        break;
      case "rejected":
        setModalContent("A problem occured.");
        setIsOpen(true);
        break;
      default:
        setModalContent("");
    }
  }, [employeesStore.status]);

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
        <form
          action="#"
          className="flex flex-col py-6"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="input-group">
            <label className="label" htmlFor="first-name">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              className="input"
              defaultValue={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="last-name">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              className="input"
              defaultValue={lastName}
              onChange={(event) => setLastName(event.currentTarget.value)}
            />
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
              yearDropdownItemNumber={60}
              scrollableYearDropdown
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
              yearDropdownItemNumber={60}
              scrollableYearDropdown
              onChange={(date: Date) => setStartDate(date)}
            />
          </div>

          <fieldset className="flex flex-col p-6 border border-gray-300">
            <legend className="label">Address</legend>

            <div className="input-group">
              <label className="label" htmlFor="street">
                Street
              </label>
              <input
                id="street"
                type="text"
                className="input"
                defaultValue={street}
                onChange={(event) => setStreet(event.currentTarget.value)}
              />
            </div>

            <div className="input-group">
              <label className="label" htmlFor="city">
                City
              </label>
              <input
                id="city"
                type="text"
                className="input"
                defaultValue={city}
                onChange={(event) => setCity(event.currentTarget.value)}
              />
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
              <input
                id="zip-code"
                type="number"
                className="input"
                defaultValue={zip}
                onChange={(event) => setZip(event.currentTarget.value)}
              />
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
      <Modal open={isOpen} onClose={handleClose}>
        <p>{modalContent}</p>
      </Modal>
    </main>
  );
}
