import { IsDateString, IsOptional, IsString } from "class-validator";

export class AgeCheckDto {
  @IsDateString()
  dateOfBirth!: string;

  @IsOptional()
  @IsString()
  sessionId?: string;
}
