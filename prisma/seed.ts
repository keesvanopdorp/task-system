import { Prisma, PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

const boards: Prisma.BoardCreateInput[] = [
	{
		name: 'Tasks',
		description: 'For all my tasks',
	},
];

const tasks: Prisma.TaskCreateWithoutBoardInput[] = [
	{
		name: 'Test Task',
		description: 'Dit is een test omschrijving',
		status: Status.BACKLOG,
		createdDate: new Date(Date.now()),
	},
];

async function main() {
	for (const board of boards) {
		board.tasks = { create: tasks };
		await prisma.board.create({
			data: board,
		});
	}
}

main()
	.then(async () => await prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
