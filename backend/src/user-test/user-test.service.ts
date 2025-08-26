import { Injectable } from "@nestjs/common";
import { ApproveUserStatus } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class UserTestService {
	constructor(private readonly prisma: PrismaService) {}

	async create(userId: bigint, answers: Record<string, any>) {
		await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				approveUser: ApproveUserStatus.pending,
			},
		});
		await this.prisma.userTest.create({
			data: {
				userId,
				answers,
			},
		});
		return;
	}

	async findAll() {
		return this.prisma.userTest.findMany({
			include: {
				user: true, // если нужно подтянуть данные пользователя
			},
		});
	}

	async findByUser(userId: bigint) {
		return this.prisma.userTest.findMany({
			where: { userId },
			include: { user: true },
		});
	}
}
