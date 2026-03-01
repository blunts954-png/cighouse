import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { AgeCheckDto } from "./dto/age-check.dto";
import { InventoryService } from "./inventory.service";

@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get("logs")
  getLogs() {
    return this.inventoryService.getLogs();
  }

  @Get("age-logs")
  getAgeLogs() {
    return this.inventoryService.getAgeLogs();
  }

  @Post("age-check")
  createAgeCheck(@Body() dto: AgeCheckDto) {
    return this.inventoryService.recordAgeCheck(dto.dateOfBirth, dto.sessionId);
  }

  @Get("compliance/restricted/:state")
  checkStateRestriction(@Param("state") state: string) {
    return {
      state: state.toUpperCase(),
      restricted: this.inventoryService.isRestrictedShippingState(state)
    };
  }
}
