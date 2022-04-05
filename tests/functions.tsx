import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import faker from 'faker';
import { uniqueId } from 'lodash';
import React from 'react';
import { RecoilRoot } from 'recoil';

import ThemeProvider from '@src/contexts/ThemeProvider';
import {
  Gender,
  Plan,
  Training,
  TrainingCategory,
  TrainingType,
  User,
  Volume,
} from '@src/types/graphql';

export const wrapper: React.ComponentType<any> = ({ children }) => (
  <ThemeProvider>
    <RecoilRoot>
      <NavigationContainer>
        <MockedProvider>{children}</MockedProvider>
      </NavigationContainer>
    </RecoilRoot>
  </ThemeProvider>
);

export const trainingFacotry = (input?: Partial<Training>): Training => ({
  __typename: 'Training',
  _id: uniqueId(),
  name: uniqueId(),
  category: faker.random.arrayElement([
    TrainingCategory.Weight,
    TrainingCategory.Cardiovascular,
    TrainingCategory.Calisthenics,
  ]),
  type: faker.random.arrayElement([
    TrainingType.Lower,
    TrainingType.Chest,
    TrainingType.Back,
    TrainingType.Shoulder,
    TrainingType.Arm,
    TrainingType.Abdominal,
    TrainingType.Cardiovascular,
    TrainingType.Etc,
  ]),
  description: faker.random.words(),
  preference: faker.datatype.number({
    min: 1,
    max: 10,
  }),
  thumbnailPath: faker.image.imageUrl(64, 64),
  videoPath: faker.image.imageUrl(64, 64),
  createdAt: faker.date.future().toISOString(),
  updatedAt: faker.date.future().toISOString(),
  ...input,
});

export const userFactory = (input?: Partial<User>): User => ({
  __typename: 'User',
  _id: uniqueId(),
  name: faker.name.lastName() + faker.name.firstName(),
  email: `${uniqueId('email')}@${faker.internet.email().split('@')[1]}`,
  nickname: uniqueId('nn'),
  password: faker.internet.password(8),
  gender: faker.random.arrayElement([Gender.Male, Gender.Female]),
  birth: faker.date
    .between(new Date(1900, 0, 1), new Date(new Date().getFullYear() - 8, 0, 1))
    .toISOString(),
  tel: faker.phone.phoneNumber('010-####-####'),
  profileImagePath: faker.image.imageUrl(64, 64),
  createdAt: faker.date.future().toISOString(),
  updatedAt: faker.date.future().toISOString(),
  ...input,
});

export const volumeFactory = (plan: Plan, input?: Partial<Volume>): Volume => {
  const randomCategory = faker.random.arrayElement([
    TrainingCategory.Weight,
    TrainingCategory.Cardiovascular,
    TrainingCategory.Calisthenics,
  ]);

  return Object.assign(
    randomCategory === TrainingCategory.Weight
      ? {
          count: faker.datatype.number(),
          weight: faker.datatype.float(2),
        }
      : randomCategory === TrainingCategory.Calisthenics
      ? {
          count: faker.datatype.number(),
        }
      : {
          times: faker.datatype.float(2),
          distances: faker.datatype.float(2),
        },
    {
      __typename: 'Volume',
      _id: uniqueId(),
      plan,
      complete: faker.datatype.boolean(),
      createdAt: faker.date.future().toISOString(),
      updatedAt: faker.date.future().toISOString(),
    },
    input,
  );
};

export const planFactory = (input?: Partial<Plan>): Plan => {
  const plan: Plan = {
    __typename: 'Plan',
    _id: uniqueId(),
    user: userFactory(),
    plannedAt: faker.date.future().toISOString(),
    training: trainingFacotry(),
    volumes: [],
    createdAt: faker.date.future().toISOString(),
    updatedAt: faker.date.future().toISOString(),
    ...input,
  };

  plan.volumes = [...Array(faker.datatype.number(10))].map(() =>
    volumeFactory(plan),
  );

  return plan;
};
