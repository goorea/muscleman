import { RegisterOptions } from 'react-hook-form';
import { EXIST_USER } from '@src/hooks/queries/useExistUserLazyQuery';
import client from '@src/client';
import { Query, QueryExistUserArgs } from '@src/types/graphql';
import { RegisterAccountFormInput } from '@src/screens/RegisterAccountScreen';
import { UseFormGetValues } from 'react-hook-form';

const useRules = (
  getValues: UseFormGetValues<RegisterAccountFormInput>,
): {
  emailRules: RegisterOptions<RegisterAccountFormInput, 'email'>;
  passwordRules: RegisterOptions<RegisterAccountFormInput, 'password'>;
  passwordConfirmationRules: RegisterOptions<
    RegisterAccountFormInput,
    'password_confirmation'
  >;
} => ({
  emailRules: {
    required: '이메일을 입력해주세요',
    pattern: {
      value:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
      message: '이메일 형식이 아닙니다',
    },
    validate: async value => {
      const { data } = await client.query<
        Pick<Query, 'existUser'>,
        QueryExistUserArgs
      >({
        query: EXIST_USER,
        variables: {
          field: 'email',
          value,
        },
      });

      return !data?.existUser || '이미 존재하는 이메일입니다';
    },
  },
  passwordRules: {
    required: '비밀번호를 입력해주세요',
    minLength: {
      value: 8,
      message: '8글자보다 적습니다',
    },
  },
  passwordConfirmationRules: {
    required: '비밀번호 확인을 입력해주세요',
    minLength: {
      value: 8,
      message: '8글자보다 적습니다',
    },
    validate: value =>
      value === getValues('password') || '비밀번호가 일치하지 않습니다',
  },
});

export default useRules;
