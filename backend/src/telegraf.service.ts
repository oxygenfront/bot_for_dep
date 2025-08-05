import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectBot } from "nestjs-telegraf";
import { Telegraf } from "telegraf";

@Injectable()
export class TelegrafService implements OnModuleInit {
    private readonly logger = new Logger(TelegrafService.name);

    constructor( @InjectBot() private readonly bot: Telegraf ) {
    }

    async onModuleInit() {
    }

    getBot(): Telegraf {
        return this.bot;
    }
}
