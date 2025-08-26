import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { Context } from "telegraf";

@Injectable()
export class TelegramUtils {
    constructor( private readonly prisma: PrismaService ) {
    }

    escapeMarkdown( text: string ): string {
        // return text.replace(/([_[\]()~>#+\-=|{}.!%\\])/g, '\\$1');
        return text.replace(/([[\]()>#+_\-=|{}.!%\\])/g, "\\$1");
    }

    getUsername( ctx: Context ): string {
        if ( "callback_query" in ctx.update ) {
            return ctx.update.callback_query.from.username || "unknown";
        } else {
            return ctx.update["message"].from.username || "unknown";
        }
    }

    getFirstName( ctx: Context ): string {
        if ( "message" in ctx.update ) {
            return ctx.update.message.from.first_name || "unknown";
        } else {
            return ctx.update["message"].from.first_name || "unknown";
        }
    }
}