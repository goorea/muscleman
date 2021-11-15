import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { getUniqueId } from 'react-native-device-info';

import AcceptModal, { AcceptModalElement } from '@src/components/AcceptModal';
import RegisterForm, {
  RegisterFormElement,
} from '@src/components/RegisterForm';
import useRegisterMutation from '@src/hooks/mutations/useRegisterMutation';
import {
  AuthStackParamList,
  RegisterStackParamList,
} from '@src/types/navigation';

import useSuccess from './hooks/useSuccess';

type P = CompositeScreenProps<
  NativeStackScreenProps<RegisterStackParamList, 'RegisterUser'>,
  NativeStackScreenProps<AuthStackParamList>
>;

const RegisterUserScreen: React.FC<P> = ({ navigation, route }) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const registerFormRef = useRef<RegisterFormElement>(null);
  const acceptModalRef = useRef<AcceptModalElement>(null);
  const [register, { data, loading }] = useRegisterMutation(setErrorMessages);
  const onSubmit = () => acceptModalRef.current?.show();
  const onConfirm = async () => {
    if (registerFormRef.current) {
      acceptModalRef.current?.hide();
      await register({
        variables: {
          input: {
            ...route.params,
            ...registerFormRef.current.getValues(),
            deviceID: getUniqueId(),
          },
        },
      });
    }
  };

  useSuccess(navigation, data);

  return (
    <>
      <RegisterForm
        ref={registerFormRef}
        errorMessages={errorMessages}
        onSubmit={onSubmit}
      />

      <AcceptModal
        ref={acceptModalRef}
        onConfirm={onConfirm}
        loading={loading}
      />
    </>
  );
};

export default RegisterUserScreen;
