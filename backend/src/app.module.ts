import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "nestjs-prisma";
import { AppService } from "./app.service";
import { TelegrafService } from "./telegraf.service";
import { TelegramModule } from "./telegram.module";
import { TelegramUpdate } from "./telegram.update";
import { TelegramUtils } from "./telegram.utils";

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
        // TelegrafModule.forRootAsync({
        //     imports: [ ConfigModule ],
        //     inject: [ ConfigService ],
        //     useFactory: ( configService: ConfigService ) => {
        //         return {
        //             token: configService.get<string>("TELEGRAM_TOKEN") || "",
        //         };
        //     },
        // }),
    ],
    providers: [ AppService, TelegramUpdate, TelegrafService, TelegramUtils ],
})
export class AppModule {
}
