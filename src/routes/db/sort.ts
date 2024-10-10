// sort.ts
import { writable } from 'svelte/store';

export interface Volunteer {
  _id: string;
  MobNum: any;
  Address: any;
  UPMail: any;
  PersonalMail: any;
  StudNum: any;
  DegProg: any;
  College: any;
  Dept: any;
  Designation: any;
  EmergName: any;
  Relationship: any;
  EmergNum: any;
  VolStatus: any;
  VolSince: any;
  DatabaseID: any;
  Notes: any;
  
  Name: string;
  Fname: string;
  Midname: string;
  Surname: string;
  Suffixname: string;
  VolType: string;
  Birthday: string;
  Sex: any;
  // Add other fields as needed
}

// Initialize the data array with a type
const initialVolunteers: Volunteer[] = []; // Initialize with empty array or your default data
export const array = writable<Volunteer[]>(initialVolunteers);

const computeName = (volunteer: Volunteer): string => {
  const { Fname, Midname, Surname, Suffixname } = volunteer;
  
  // Handle null names
  const suffix = Suffixname ? `, ${Suffixname}` : '';
  const midname = Midname ? ` ${Midname}` : '';

  return `${Fname}${midname} ${Surname}${suffix}`;
};

export function updateData(newData: Volunteer[]) {
  console.log("sort.ts updating data");
  // Compute the Name field for each volunteer
  const updatedData = newData.map(volunteer => ({
    ...volunteer,
    Name: computeName(volunteer)
  }));
  array.set(updatedData);
}