import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BigIntInterceptor } from "./common/interceptors";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: ["http://localhost:5678"],
	});

	app.useGlobalInterceptors(new BigIntInterceptor());

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
