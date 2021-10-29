export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONObject: any;
  ObjectId: any;
};

export type AuthenticationResponse = {
  __typename?: 'AuthenticationResponse';
  refresh_token: Scalars['String'];
  token: Scalars['String'];
  user: User;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type JwtResponse = {
  __typename?: 'JWTResponse';
  refresh_token: Scalars['String'];
  token: Scalars['String'];
};

export type LoginInput = {
  device_id: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Model = {
  _id: Scalars['ID'];
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlan: Plan;
  createTraining: Training;
  deletePlan: Scalars['Boolean'];
  deleteTraining: Scalars['Boolean'];
  login: AuthenticationResponse;
  refreshToken: JwtResponse;
  register: AuthenticationResponse;
  sendVerifyEmail: Scalars['String'];
  updatePlan: Scalars['Boolean'];
  updateTraining: Scalars['Boolean'];
  verify: Scalars['Boolean'];
};

export type MutationCreatePlanArgs = {
  input: PlanInput;
};

export type MutationCreateTrainingArgs = {
  input: TrainingInput;
};

export type MutationDeletePlanArgs = {
  _id: Scalars['ObjectId'];
};

export type MutationDeleteTrainingArgs = {
  _id: Scalars['ObjectId'];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRefreshTokenArgs = {
  device_id: Scalars['String'];
  refresh_token: Scalars['String'];
};

export type MutationRegisterArgs = {
  input: UserInput;
};

export type MutationUpdatePlanArgs = {
  _id: Scalars['ObjectId'];
  input: PlanInput;
};

export type MutationUpdateTrainingArgs = {
  _id: Scalars['ObjectId'];
  input: TrainingInput;
};

export type MutationVerifyArgs = {
  input: VerifyInput;
};

export type Plan = Model & {
  __typename?: 'Plan';
  _id: Scalars['ID'];
  checkPermission: Scalars['Boolean'];
  complete?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['DateTime']>;
  plan_date: Scalars['DateTime'];
  sets?: Maybe<Array<Set>>;
  training: Training;
  updated_at?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type PlanInput = {
  complete?: Maybe<Scalars['Boolean']>;
  plan_date: Scalars['DateTime'];
  sets?: Maybe<Array<SetInput>>;
  training: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  plans: Array<Plan>;
  users: Array<User>;
};

export enum Role {
  Admin = 'ADMIN',
  Verified = 'VERIFIED',
}

export type Set = {
  __typename?: 'Set';
  count?: Maybe<Scalars['Int']>;
  distances?: Maybe<Scalars['Float']>;
  times?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

export type SetInput = {
  count?: Maybe<Scalars['Int']>;
  distances?: Maybe<Scalars['Float']>;
  times?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

export type Training = Model & {
  __typename?: 'Training';
  _id: Scalars['ID'];
  created_at?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  preference?: Maybe<Scalars['Int']>;
  thumbnail_path?: Maybe<Scalars['String']>;
  type: TrainingType;
  updated_at?: Maybe<Scalars['DateTime']>;
  video_path?: Maybe<Scalars['String']>;
};

export type TrainingInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  preference?: Maybe<Scalars['Int']>;
  thumbnail_path?: Maybe<Scalars['String']>;
  type: TrainingType;
  video_path?: Maybe<Scalars['String']>;
};

export enum TrainingType {
  Abdominal = 'ABDOMINAL',
  Arm = 'ARM',
  Back = 'BACK',
  Cardiovascular = 'CARDIOVASCULAR',
  Chest = 'CHEST',
  Etc = 'ETC',
  Lower = 'LOWER',
  Shoulder = 'SHOULDER',
}

export type User = Model & {
  __typename?: 'User';
  _id: Scalars['ID'];
  birth?: Maybe<Scalars['DateTime']>;
  created_at?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  email_verify_token?: Maybe<Scalars['String']>;
  gender: Gender;
  name: Scalars['String'];
  nickname: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  profile_image_path?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['JSONObject']>;
  roles?: Maybe<Array<Role>>;
  tel?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type UserInput = {
  birth?: Maybe<Scalars['DateTime']>;
  device_id: Scalars['String'];
  email: Scalars['String'];
  gender: Gender;
  name: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
  profile_image_path?: Maybe<Scalars['String']>;
  tel?: Maybe<Scalars['String']>;
};

export type VerifyInput = {
  email: Scalars['String'];
  email_verify_token: Scalars['String'];
};
