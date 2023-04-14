import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IAvailability } from "./search.interface";

@ValidatorConstraint()
export class AvailabilityObject implements ValidatorConstraintInterface {
  validate(availability: IAvailability) {
    let isValid = false; 
    if (availability.from) {
       isValid = this.validateTime(availability.from)
    } else {
      return false;
    }
    if (availability.to) {
      isValid &&= this.validateTime(availability.to);
    } else {
      return false
    }

    return isValid && this.compareTime(availability) ;
  }

  validateTime(time: string) {
    const [hour, minutes] = time.trim().split(":").map(x => parseInt(x));
    if (hour < 0 && hour > 23) {
      return false;
    }
    if (minutes < 0 && minutes > 59) {
      return false;
    }
    
    return true;
  }

  compareTime({from, to}: IAvailability) {
    const [fromHour, fromMinutes] = from.trim().split(":").map(x => parseInt(x));
    const [toHour, toMinutes] = to.trim().split(":").map(x => parseInt(x));
    if (fromHour > toHour) return false;
    if (fromHour === toHour && fromMinutes > toMinutes) return false;
    return true
  }

  

  defaultMessage(): string {
    return 'Availabilty is not valid and please choose from and to key in frame of 0:00 - 23:59';
  }
}
