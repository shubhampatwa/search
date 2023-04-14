type DENTAL = "DENTAL";
type VET = "VET";

export interface IAvailability {
  from: string;
  to: string;
}

export interface IClinicData {
  clincType: DENTAL | VET;
  name: String;
  stateName: String;
  availability: IAvailability
  
}

export interface ISearchClinicData extends IClinicData {
  availabilityInMinutes: IAvailabilityMinutes
}


export interface IAvailabilityMinutes {
  from: number;
  to: number;
}

export interface IVetClinicData {
  clincType: String;
  clinicName: String;
  stateCode: String;
  opening: {
    from: String;
    to: String;
  }
}