import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Planning: NavigatorScreenParams<PlanningStackParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  Plans: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  SuccessModal: {
    type: '로그인' | '회원가입';
    userName: string;
  };
};

export type RegisterStackParamList = {
  RegisterAccount: undefined;
  RegisterUser: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
};

export type PlanningStackParamList = {
  EditPlan: {
    plannedAt: string;
    trainings?: string[];
  };
  AddTraining: {
    plannedAt: string;
  };
};
