import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HRnet - Employees",
  description: "List of all employees",
};

export default function EmployeeList() {
  return (
    <main className="p-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2">Current Employees</h1>
        </div>
        <table className="mb-2"></table>
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
