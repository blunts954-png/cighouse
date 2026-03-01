import { Module } from "@nestjs/common";

import { InventoryModule } from "../inventory/inventory.module";
import { ProductsModule } from "../products/products.module";
import { SalesController } from "./sales.controller";
import { SalesService } from "./sales.service";

@Module({
  imports: [ProductsModule, InventoryModule],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
