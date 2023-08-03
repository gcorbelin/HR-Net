import { Address } from "./address";
import { Employment } from "./employment";

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  employment: Employment;
  address: Address;
};
