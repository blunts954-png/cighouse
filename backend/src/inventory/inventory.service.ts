import { Injectable } from "@nestjs/common";

import { AgeLog, InventoryLog, InventoryReason } from "../domain.types";
import { createId } from "../utils";

@Injectable()
export class InventoryService {
  private readonly logs: InventoryLog[] = [];
  private readonly ageLogs: AgeLog[] = [];

  // Placeholder ruleset. Replace with live legal matrix in production.
  private readonly restrictedShippingStates = new Set(["AK", "HI", "ME", "UT"]);

  getLogs(): InventoryLog[] {
    return this.logs;
  }

  recordLog(params: {
    productId: string;
    changeAmount: number;
    reason: InventoryReason;
    adminId?: string;
  }): InventoryLog {
    const log: InventoryLog = {
      id: createId(),
      productId: params.productId,
      changeAmount: params.changeAmount,
      reason: params.reason,
      adminId: params.adminId,
      timestamp: new Date().toISOString()
    };
    this.logs.unshift(log);
    return log;
  }

  isRestrictedShippingState(stateCode: string): boolean {
    return this.restrictedShippingStates.has(stateCode.trim().toUpperCase());
  }

  getAgeLogs(): AgeLog[] {
    return this.ageLogs;
  }

  recordAgeCheck(dateOfBirth: string, sessionId?: string): AgeLog {
    const isAllowed = this.is21OrOlder(dateOfBirth);
    const ageLog: AgeLog = {
      id: createId(),
      dateOfBirth,
      isAllowed,
      checkedAt: new Date().toISOString(),
      sessionId
    };
    this.ageLogs.unshift(ageLog);
    return ageLog;
  }

  private is21OrOlder(dateOfBirth: string): boolean {
    const birthDate = new Date(dateOfBirth);
    if (Number.isNaN(birthDate.getTime())) {
      return false;
    }

    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
      age -= 1;
    }

    return age >= 21;
  }
}
