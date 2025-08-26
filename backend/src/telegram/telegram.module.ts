import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'
import { TelegramUpdate } from './telegram.update'
import { TelegramUtils } from './telegram.utils'
import {
    TelegramWebhookController
} from '../webhooks/telegram-webhook.controller'

@Module({
    imports: [
        ConfigModule,
        TelegrafModule.forRootAsync({
            imports: [ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: ( configService: ConfigService ) => {
                const domain = configService.get<string>('WEBHOOK_DOMAIN') || ''
                return {
                    token: configService.get<string>('TELEGRAM_TOKEN') || '',
                    launchOptions: {
                        webhook: {
                            domain,
                            path: '/telegram-webhook',
                            allowedUpdates: [ 'message', 'callback_query', 'edited_message', 'channel_post', 'inline_query' ],
                            dropPendingUpdates: true,
                        },
                    },
                }
            },
        }),
    ],
    providers: [
        TelegramUpdate,
        TelegramUtils
    ],
    controllers: [ TelegramWebhookController ],
})
export class TelegramModule {
    // constructor( @InjectBot() private readonly bot: Telegraf ) {
    //     SessionMiddleware.configure(this.bot)
    // }
}