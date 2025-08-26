import {
	Body,
	Controller,
	Get,
	ParseIntPipe,
	Post,
	Query,
} from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(private readonly service: UserService) {}

	@Post()
	async create(@Body() body: any) {
		return this.service.create(BigInt(body.userId), body);
	}

	@Get()
	async findByUser(@Query("userId") userId: string) {
		return this.service.findByUserId(BigInt(userId));
	}
}
