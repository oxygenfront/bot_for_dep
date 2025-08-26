import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { UserTestController } from "./user-test.controller";
import { UserTestService } from "./user-test.service";

@Module({
	imports: [PrismaModule],
	controllers: [UserTestController],
	providers: [UserTestService],
})
export class UserTestModule {}
