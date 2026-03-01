import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: "ok",
      service: "cigarette-house-backend",
      timestamp: new Date().toISOString()
    };
  }
}
