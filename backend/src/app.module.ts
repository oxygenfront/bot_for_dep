import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "nestjs-prisma";
import { TelegrafService } from "./telegram/telegraf.service";
import { TelegramModule } from "./telegram/telegram.module";
import { TelegramUpdate } from "./telegram/telegram.update";
import { TelegramUtils } from "./telegram/telegram.utils";
import { UserModule } from "./user/user.module";
import { UserTestModule } from "./user-test/user-test.module";

@Module({
	imports: [
		ConfigModule,
		PrismaModule.forRoot({
			isGlobal: true,
			prismaServiceOptions: {
				explicitConnect: true,
			},
		}),
		TelegramModule,
		UserTestModule,
		UserModule,
	],
	providers: [TelegramUpdate, TelegrafService, TelegramUtils],
})
export class AppModule {}
