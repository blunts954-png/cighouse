import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateSaleDto } from "./dto/create-sale.dto";
import { SalesService } from "./sales.service";

@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  getSales() {
    return this.salesService.findAll();
  }

  @Post()
  createSale(@Body() dto: CreateSaleDto) {
    return this.salesService.createSale(dto);
  }
}
