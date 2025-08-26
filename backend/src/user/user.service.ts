import { Injectable } from "@nestjs/common";
import { ApproveUserStatus } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(userId: bigint, body: any) {
		return this.prisma.user.create({
			data: {
				id: userId,
				username: body.username,
				approveUser: body.approveUser || ApproveUserStatus.needTesting,
			},
		});
	}

	async findByUserId(userId: bigint) {
		return this.prisma.user.findUniqueOrThrow({
			where: { id: userId },
		});
	}
}
