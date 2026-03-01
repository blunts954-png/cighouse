import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { Product } from "../domain.types";
import { InventoryService } from "../inventory/inventory.service";
import { createId } from "../utils";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: createId(),
      name: "Apex Disposable Vape",
      description: "High-demand disposable line for nightly convenience traffic.",
      price: 24.99,
      sku: "DISP-APEX-01",
      stockQuantity: 120,
      categoryId: "vapes",
      createdAt: new Date().toISOString()
    },
    {
      id: createId(),
      name: "Borosilicate Glass Rig",
      description: "Premium shelf glass for collector and regular buyers.",
      price: 89.0,
      sku: "GLASS-RIG-09",
      stockQuantity: 18,
      categoryId: "glass",
      threedModelUrl: "https://example.com/models/glass-rig.glb",
      createdAt: new Date().toISOString()
    }
  ];

  constructor(private readonly inventoryService: InventoryService) {}

  findAll(): Product[] {
    return this.products;
  }

  findById(id: string): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(dto: CreateProductDto): Product {
    const product: Product = {
      id: createId(),
      name: dto.name,
      description: dto.description,
      price: dto.price,
      sku: dto.sku,
      stockQuantity: dto.stockQuantity,
      categoryId: dto.categoryId,
      threedModelUrl: dto.threedModelUrl,
      createdAt: new Date().toISOString()
    };
    this.products.unshift(product);
    return product;
  }

  updateStock(id: string, dto: UpdateStockDto) {
    const product = this.findById(id);
    const nextQuantity = product.stockQuantity + dto.changeAmount;

    if (nextQuantity < 0) {
      throw new BadRequestException(`Insufficient stock for product ${product.name}`);
    }

    product.stockQuantity = nextQuantity;
    const log = this.inventoryService.recordLog({
      productId: id,
      changeAmount: dto.changeAmount,
      reason: dto.reason,
      adminId: dto.adminId
    });

    return {
      product,
      log
    };
  }
}
