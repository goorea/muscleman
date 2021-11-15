import { gql } from '@apollo/client';

export const GET_ONE_RM = gql`
  query getOneRM($name: String!) {
    getOneRM(name: $name)
  }
`;

export interface SBDOneRM {
  squat: number;
  benchPress: number;
  deadlift: number;
}

export const GET_SBD_ONE_RM = gql`
  query getSDBOneRM {
    squat: getOneRM(name: "바벨 백스쿼트")
    benchPress: getOneRM(name: "벤치 프레스")
    deadlift: getOneRM(name: "데드리프트")
  }
`;
