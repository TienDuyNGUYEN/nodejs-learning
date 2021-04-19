import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import faker from 'faker';

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
      username: 'teacher1',
      email: 'teacher1@yopmail.com',
      password,
      firstName: '1',
      lastName: 'teacher',
    },
    {
      username: 'admin1',
      email: 'admin1@yopmail.com',
      password,
      firstName: '1',
      lastName: 'admin',
    },
  ];
  await prisma.user.createMany({ data: usersDefault });
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
  await prisma.user.createMany({ data: usersFake });
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
  await prisma.category.createMany({ data: categoryData });
  await prisma.room.createMany({ data: roomData });

  // -----------------------------------------------
  // Create formations
  const formationData = [];
  for (let i = 0; i < languages.length; ++i) {
    const randomCategory = categoryData[Math.floor(Math.random() * categoryData.length)];
    formationData.push({
      title: `Formation ${languages[i]}`,
      description: faker.lorem.paragraphs(),
      teacher: { connect: { email: 'teacher1@yopmail.com' } },
      categories: { connect: { name: randomCategory.name } },
    });
  }
  await prisma.formation.createMany({ data: formationData });
  console.log('Created formations');

  // -----------------------------------------------
  // Create formations sessions
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
