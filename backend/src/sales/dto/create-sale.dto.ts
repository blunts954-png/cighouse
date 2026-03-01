import { IsBoolean, IsEmail, IsIn, IsInt, IsOptional, IsString, Length, Min } from "class-validator";

import { SaleSource } from "../../domain.types";

export class CreateSaleDto {
  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsIn(["online", "pos"])
  source!: SaleSource;

  @IsBoolean()
  termsAccepted!: boolean;

  @IsOptional()
  @IsEmail()
  customerEmail?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  shippingState?: string;
}
