import { CarsApiClient } from '@/api/CarsApiClient';
import { paramsFixtures } from '@/fixtures/params.fixture';

export const carsApiFixtures = paramsFixtures.extend<{
  carsApiClient: CarsApiClient;
}>({
  carsApiClient: async ({ request, params }, use) => {
    await request.post('/api/auth/signin', {
      data: {
        email: process.env[params.userEmailEnv],
        password: process.env[params.userPasswordEnv],
        remember: false,
      },
    });

    await use(new CarsApiClient(request));
  },
});
