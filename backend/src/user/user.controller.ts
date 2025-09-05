import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(private readonly service: UserService) {}

	@Post()
	async create(@Body() body: any) {
		return this.service.create(BigInt(body.userId), body);
	}

	@Get()
	async find(@Query("userId") userId: string, @Query("search") search: string) {
		if (userId) {
			return this.service.findByUserId(BigInt(userId));
		}
		return this.service.findAll(search);
	}
}
