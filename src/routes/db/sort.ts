// sort.ts
import { writable } from 'svelte/store';

export interface Volunteer {
  _id: string;
  MobileNum: any;
  PersonalMail: any;
  Address: any;
  UPMail: any;
  StudentNumber: any;
  DegreeProgram: any;
  College: any;
  Department: any;
  Designation: any;
  EmergencyContactName: any;
  EmergencyContactRelationship: any;
  EmergencyContactNumber: any;
  VolunteerStatus: any;
  VolunteerSince: any;
  DatabaseID: any;
  Notes: any;
  
  Name: string;
  Fname: string;
  Midname: string;
  Surname: string;
  Suffixname: string;
  VolType: string;
  Birthday: string;
  
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