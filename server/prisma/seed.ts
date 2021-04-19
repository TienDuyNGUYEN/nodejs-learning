import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import faker from 'faker';
import { getRandomItem } from 'src/common/utils/getRandomItem';

const prisma = new PrismaClient();

// eslint-disable-next-line max-lines-per-function
async function main(): Promise<void> {
  // Delete all olds data
  await prisma.category.deleteMany();
  await prisma.room.deleteMany();
  await prisma.formation.deleteMany();
  await prisma.formationSession.deleteMany();
  await prisma.formationSession.deleteMany();

  const password = await bcrypt.hash('1234567', 12);

  // default user
  const usersDefault = [
    {
      username: 'user1',
      email: 'user1@yopmail.com',
      password,
      firstName: '1',
      lastName: 'user',
    },
    {
      username: 'admin1',
      email: 'admin1@yopmail.com',
      password,
      firstName: '1',
      lastName: 'admin',
    },
  ];
  await prisma.user.createMany({ data: usersDefault, skipDuplicates: true });
  const teacherFake = await prisma.user.create({
    data: {
      username: 'teacher1',
      email: 'teacher1@yopmail.com',
      password,
      firstName: '1',
      lastName: 'teacher',
    },
  });
  // await Promise.all(usersDefault.map((user) => prisma.user.create({ data: user })));
  console.log('3 users default created');

  const usersFake = [];
  for (let i = 0; i < 50; ++i) {
    usersFake.push({
      username: 'user' + Math.floor(1000000 * Math.random()),
      email: faker.internet.email(),
      password: password,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: Math.floor(100 * Math.random()),
    });
  }
  await prisma.user.createMany({ data: usersFake, skipDuplicates: true });
  // await Promise.all(usersFake.map((user) => prisma.user.create({ data: user })));
  console.log('50 users created');

  // -----------------------------------------------
  // Create rooms & categories
  const categoryData = [];
  const roomData = [];
  const languages = ['Javascript', 'TypeScript', 'C#', 'Python', 'Ruby', 'Golang', 'Java', 'Rust', 'HTML-CSS'];

  for (let i = 0; i < languages.length; ++i) {
    roomData.push({ name: 'Room ' + languages[i] });
    categoryData.push({ name: languages[i] });
  }

  const frameworks = [
    'Nodejs',
    'React',
    'Vue',
    'Angular',
    'Nestjs',
    'Nextjs',
    'Vitejs',
    'Bootstrap',
    'TailwindCSS',
    'RubyOnRails',
    'Python-Django',
    'Python-Flask',
    '.Net-core',
    'Deno',
    'Nuxtjs',
  ];

  for (let i = 0; i < frameworks.length; ++i) {
    roomData.push({ name: 'Room ' + frameworks[i] });
    categoryData.push({ name: frameworks[i] });
  }
  await prisma.category.createMany({ data: categoryData, skipDuplicates: true });
  await prisma.room.createMany({ data: roomData, skipDuplicates: true });

  // -----------------------------------------------
  // Create formations
  const formationRecords = [];
  for (let i = 0; i < languages.length; ++i) {
    const randomCategory = getRandomItem(categoryData);
    const formation = await prisma.formation.create({
      data: {
        title: `Formation ${languages[i]}`,
        description: faker.lorem.paragraphs(),
        teacher: { connect: { id: teacherFake.id } },
        categories: { connect: { name: randomCategory.name } },
      },
    });
    formationRecords.push(formation);
  }
  console.log('Formations created');

  // -----------------------------------------------
  // Create formations sessions
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formationSessionRecords = [];
  for (let i = 0; i < 100; ++i) {
    const randomFormation = getRandomItem(formationRecords);
    const randomRoom = getRandomItem(roomData);
    const formationSession = await prisma.formationSession.create({
      data: {
        room: { connect: { name: randomRoom.name } },
        formation: { connect: { id: randomFormation.id } },
        startDate: today,
        endDate: tomorrow,
      },
    });
    formationSessionRecords.push(formationSession);
  }
  console.log('100 formations sessions created');

  // -----------------------------------------------
  // Create formations attendances
  for (let i = 0; i < 100; ++i) {
    const randomFormation = getRandomItem(formationRecords);
    const randomUser = getRandomItem(usersFake);
    const randomSession = getRandomItem(formationSessionRecords);
    await prisma.formationAttendance.create({
      data: {
        user: { connect: { email: randomUser.email } },
        formation: { connect: { id: randomFormation.id } },
        formationSession: { connect: { id: randomSession.id } },
      },
    });
  }
  console.log('100 formations attendances created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
