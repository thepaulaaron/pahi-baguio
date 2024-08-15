// sort.js
import { derived, writable } from 'svelte/store';

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