import { InjectBot, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";

@Update()
export class TelegramUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
    ) {
    }

    @Start()
    async onStart( ctx: Context ) {
        await ctx.reply('hello')
    }

}