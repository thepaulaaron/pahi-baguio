// volunteerModel.ts
export interface Volunteer {
  _id: string;
  Name: string;
  Fname: string;
  Midname: string;
  Surname: string;
  Suffixname: string;
  Sex: any;
  Birthday: string;
  MobNum: any;
  PersonalMail: any;
  Address: any;
  UPMail: any;
  StudNum: any;
  DegProg: any;
  College: any;
  Dept: any;
  Designation: any;
  EmergName: any;
  Relationship: any;
  EmergNum: any;
  VolStatus: any;
  VolType: typeof VOL_TYPES[number] | '';
  VolSince: any;
  DatabaseID: any;
  Notes: any;
}

export const VOL_TYPES = [
  "Student",
  "Faculty",
  "Staff",
  "Alumnus",
  "Friend",
] as const;

export function createBlankVolunteer(): Volunteer {
  return {
    _id: '',
    Name: '',
    Fname: '',
    Midname: '',
    Surname: '',
    Suffixname: '',
    Sex: '',
    Birthday: '',
    MobNum: '',
    PersonalMail: '',
    Address: '',
    UPMail: '',
    StudNum: '',
    DegProg: '',
    College: '',
    Dept: '',
    Designation: '',
    EmergName: '',
    Relationship: '',
    EmergNum: '',
    VolStatus: '',
    VolType: '',
    VolSince: '',
    DatabaseID: '',
    Notes: '',
  };
}