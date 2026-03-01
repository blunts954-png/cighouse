import { Module } from "@nestjs/common";

import { HealthController } from "./health.controller";
import { InventoryModule } from "./inventory/inventory.module";
import { ProductsModule } from "./products/products.module";
import { SalesModule } from "./sales/sales.module";

@Module({
  imports: [InventoryModule, ProductsModule, SalesModule],
  controllers: [HealthController]
})
export class AppModule {}
