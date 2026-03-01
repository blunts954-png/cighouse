import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get(":id")
  getProduct(@Param("id") id: string) {
    return this.productsService.findById(id);
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(":id/stock")
  patchStock(@Param("id") id: string, @Body() dto: UpdateStockDto) {
    return this.productsService.updateStock(id, dto);
  }
}
