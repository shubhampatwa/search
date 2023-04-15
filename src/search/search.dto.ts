import { Transform, Type } from "class-transformer";
import { IsOptional, IsString, Validate } from "class-validator";
import { AvailabilityObject } from "./search.validation";

class Availability  {
  @IsString()
  from: string;
  
  @IsString()
  to: string;
}

export class SearchDTO {
    @IsString()
    @IsOptional()
    @Transform(({value}) => value.trim().toLowerCase())
    name?: string;

    @IsString()
    @IsOptional()
    @Transform(({value}) => value.trim().toLowerCase())
    stateName?: string;

    @IsOptional()
    @Type(() => Availability)
    @Validate(AvailabilityObject)
    availability?: Availability 
}