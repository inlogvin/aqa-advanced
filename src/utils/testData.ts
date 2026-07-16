import { faker } from '@faker-js/faker';
import { UserRegistrationData } from '@/utils/types';

export const generateUser = (): UserRegistrationData => ({
  name: faker.person.firstName('male').replace(/[^a-zA-Z]/g, '').slice(0, 20),
  lastName: faker.person.lastName().replace(/[^a-zA-Z]/g, '').slice(0, 20),
  email: `aqa_${faker.internet.email()}`,
  password: 'Test1234!',
});
