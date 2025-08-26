import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
} from "@nestjs/common";
import { UserTestService } from "./user-test.service";

@Controller("user-test")
export class UserTestController {
	constructor(private readonly service: UserTestService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() body: { userId: string; answers: Record<string, any> }) {
		return this.service.create(BigInt(body.userId), body.answers);
	}

	@Get()
	async findAll() {
		return this.service.findAll();
	}

	@Get(":userId")
	async findByUser(@Param("userId", ParseIntPipe) userId: number) {
		return this.service.findByUser(BigInt(userId));
	}
}
