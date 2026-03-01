import { BadRequestException, Injectable } from "@nestjs/common";

import { Sale } from "../domain.types";
import { InventoryService } from "../inventory/inventory.service";
import { ProductsService } from "../products/products.service";
import { createId } from "../utils";
import { CreateSaleDto } from "./dto/create-sale.dto";

@Injectable()
export class SalesService {
  private readonly sales: Sale[] = [];

  constructor(
    private readonly productsService: ProductsService,
    private readonly inventoryService: InventoryService
  ) {}

  findAll(): Sale[] {
    return this.sales;
  }

  createSale(dto: CreateSaleDto) {
    if (!dto.termsAccepted) {
      throw new BadRequestException("Terms acceptance is required before checkout.");
    }

    if (
      dto.source === "online" &&
      dto.shippingState &&
      this.inventoryService.isRestrictedShippingState(dto.shippingState)
    ) {
      throw new BadRequestException(
        `Shipping restricted for state ${dto.shippingState.toUpperCase()}.`
      );
    }

    const product = this.productsService.findById(dto.productId);
    if (product.stockQuantity < dto.quantity) {
      throw new BadRequestException(`Insufficient stock for ${product.name}.`);
    }

    this.productsService.updateStock(dto.productId, {
      changeAmount: dto.quantity * -1,
      reason: "sale"
    });

    const totalPrice = Number((product.price * dto.quantity).toFixed(2));
    const sale: Sale = {
      id: createId(),
      productId: dto.productId,
      quantity: dto.quantity,
      totalPrice,
      source: dto.source,
      customerEmail: dto.customerEmail,
      customerPhone: dto.customerPhone,
      createdAt: new Date().toISOString()
    };

    this.sales.unshift(sale);

    return {
      sale,
      receipt: this.buildReceipt(sale, product.name)
    };
  }

  private buildReceipt(sale: Sale, productName: string) {
    return {
      receiptId: `CH-${sale.id.slice(0, 8).toUpperCase()}`,
      productName,
      quantity: sale.quantity,
      total: sale.totalPrice,
      sentTo: {
        email: sale.customerEmail ?? null,
        phone: sale.customerPhone ?? null
      },
      deliveryStatus:
        sale.customerEmail || sale.customerPhone
          ? "queued_for_sms_or_email"
          : "no_destination_provided"
    };
  }
}
