import { IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateStockDto {
  @IsInt()
  changeAmount!: number;

  @IsIn(["restock", "damage", "sale", "manual_adjustment"])
  reason!: "restock" | "damage" | "sale" | "manual_adjustment";

  @IsOptional()
  @IsString()
  adminId?: string;
}
