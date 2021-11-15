import { useApolloClient } from '@apollo/client';
import { RegisterOptions } from 'react-hook-form';
import { UseFormGetValues } from 'react-hook-form';

import { EXIST_EMAIL_FROM_USER } from '@src/operations/queries/existUser';
import { RegisterAccountFormInput } from '@src/screens/RegisterAccountScreen';
import { QueryExistUserArgs } from '@src/types/graphql';

const useRules = (
  getValues: UseFormGetValues<RegisterAccountFormInput>,
): {
  emailRules: RegisterOptions<RegisterAccountFormInput, 'email'>;
  passwordRules: RegisterOptions<RegisterAccountFormInput, 'password'>;
  passwordConfirmationRules: RegisterOptions<
    RegisterAccountFormInput,
    'passwordConfirmation'
  >;
} => {
  const client = useApolloClient();

  return {
    emailRules: {
      required: '이메일을 입력해주세요',
      pattern: {
        value:
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
        message: '이메일 형식이 아닙니다',
      },
      validate: async value => {
        if (process.env.NODE_ENV === 'test') {
          return true;
        }

        const { data } = await client.query<
          { existEmailFromUser: boolean },
          Pick<QueryExistUserArgs, 'value'>
        >({
          query: EXIST_EMAIL_FROM_USER,
          variables: { value },
        });

        return !data?.existEmailFromUser || '이미 존재하는 이메일입니다';
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
  };
};

export default useRules;
