import { RegisterOptions } from 'react-hook-form';

import client from '@src/client';
import { RegisterUserFormInput } from '@src/components/RegisterForm';
import { EXIST_USER } from '@src/hooks/queries/useExistUserLazyQuery';
import { Query, QueryExistUserArgs } from '@src/types/graphql';

const useRules = (): {
  nameRules: RegisterOptions<RegisterUserFormInput, 'name'>;
  nicknameRules: RegisterOptions<RegisterUserFormInput, 'nickname'>;
  telRules: RegisterOptions<RegisterUserFormInput, 'tel'>;
  birthRules: RegisterOptions<RegisterUserFormInput, 'birth'>;
} => ({
  nameRules: {
    required: '이름을 입력해주세요',
    minLength: {
      value: 2,
      message: '2글자보다 적습니다',
    },
    maxLength: {
      value: 8,
      message: '8글자보다 많습니다',
    },
  },
  nicknameRules: {
    required: '닉네임을 입력해주세요',
    minLength: {
      value: 2,
      message: '2글자보다 적습니다',
    },
    maxLength: {
      value: 8,
      message: '8글자보다 많습니다',
    },
    validate: async value => {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      const { data } = await client.query<
        Pick<Query, 'existUser'>,
        QueryExistUserArgs
      >({
        query: EXIST_USER,
        variables: {
          field: 'nickname',
          value,
        },
      });

      return !data?.existUser || '이미 존재하는 닉네임입니다';
    },
  },
  telRules: {
    required: '휴대폰 번호를 입력해주세요',
  },
  birthRules: {
    required: '생년월일을 선택해주세요',
  },
});

export default useRules;
