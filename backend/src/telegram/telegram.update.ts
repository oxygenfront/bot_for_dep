import { InjectBot, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";

@Update()
export class TelegramUpdate {
	constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

	@Start()
	async onStart(ctx: Context) {
		const userId = ctx.from?.id;
		const username = ctx.from?.username || "";
		await ctx.reply("Открыть мини‑приложение", {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Открыть",
							web_app: {
								url: `https://42ef291f40cc.ngrok-free.app`,
							},
						},
					],
				],
			},
		});
	}
}
