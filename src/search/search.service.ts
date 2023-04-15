import { Injectable, OnModuleInit } from '@nestjs/common';
import fetch from "node-fetch";
import { SearchDTO } from './search.dto';
import { IAvailability, IAvailabilityMinutes, IClinicData, ISearchClinicData } from './search.interface';

@Injectable()
export class SearchService implements OnModuleInit {

  clinicData: ISearchClinicData[] = [];
  dentalClinicUrl = "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";
  vetClinicUrl = "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json";
  async onModuleInit() {
    await this.setData();
  }

  async setData() {
    try {
      this.clinicData = await this.getData();
    } catch (error) {
      await this.setData();
    }
  }

  async search(searchQuery: SearchDTO): Promise<IClinicData[]> {
    const {name, stateName, availability} = searchQuery;
    return this.clinicData.filter((clinic) => {
      if( name && clinic.name.indexOf(name) === -1 ) return false;
      if( stateName && clinic.stateName.indexOf(stateName) === -1 ) return false;
      if( availability && !this.isAvailable(availability, clinic.availabilityInMinutes) ) return false;
      return true;
    }).map(({ availabilityInMinutes, ...data }) => data);
  }

  async getData(): Promise<ISearchClinicData[]> {
    const [rawDentalClinics, rawVetClinics] = await Promise.all([
      fetch(this.dentalClinicUrl),
      fetch(this.vetClinicUrl)
  ]);
    const [dentalClinics, vetClinics] = await Promise.all([rawDentalClinics.json(), rawVetClinics.json()]);
    return [...dentalClinics.map((val) => ({
        clincType : "Dental",
        name: val.name.toLowerCase(),
        stateName: val.stateName.toLowerCase(),
        availability: val.availability,
        availabilityInMinutes: this.convertAvailabilityToMinutes(val.availability),
      })), 
     ...vetClinics.map((val) => ({
       clincType : "Vet",
        name: val.clinicName.toLowerCase(),
        stateName: val.stateCode.toLowerCase(),
        availability: val.opening,
        availabilityInMinutes: this.convertAvailabilityToMinutes(val.opening),
      })),
    ];
  }

  convertTime(time: string): number {
    const [hour, minutes] = time.split(":").map(x => parseInt(x));
    return minutes + (hour * 60);
  }

  convertAvailabilityToMinutes(availability: IAvailability): IAvailabilityMinutes  {
    return {
      from: this.convertTime(availability.from),
      to: this.convertTime(availability.to)
    }
  }

  isAvailable(searchAvailabilty: IAvailability, clinicAvailabilty: IAvailabilityMinutes ): boolean{
    const {from, to} = clinicAvailabilty;
    const {from: searchFrom, to: searchTo} = this.convertAvailabilityToMinutes(searchAvailabilty);
    return (from <= searchFrom && searchTo <= to);
  }
}
