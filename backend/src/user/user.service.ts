import { Injectable } from "@nestjs/common";
import { ApproveUserStatus, type User } from "@prisma/client";
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

	async findAll(search: string) {
		return this.prisma.user.findMany({
			where: {
				OR: [
					{ username: { contains: search, mode: "insensitive" } },
					{ id: BigInt(search) },
				],
			},
		});
	}

	async findByUserId(userId: bigint) {
		const res = await this.prisma.user.findUniqueOrThrow({
			where: { id: userId },
			include: {
				UserTest: {
					omit: {
						id: true,
						userId: true,
					},
				},
			},
		});
		const firstTest = res.UserTest[0] || {};

		return {
			id: res.id,
			username: res.username,
			approveUser: res.approveUser,
			...firstTest,
		};
	}
}
