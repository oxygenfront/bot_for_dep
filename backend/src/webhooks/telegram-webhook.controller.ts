import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Controller('telegram-webhook')
export class TelegramWebhookController {
    constructor( @InjectBot() private readonly bot: Telegraf ) {
    }

    @Post()
    @HttpCode(200)
    async handleWebhook( @Body() update: any ): Promise<{ ok: boolean }> {
        try {
            await this.bot.handleUpdate(update);
            return { ok: true };
        } catch ( error ) {
            console.error('Ошибка обработки вебхука Telegram:', error);
            return { ok: false };
        }
    }
}