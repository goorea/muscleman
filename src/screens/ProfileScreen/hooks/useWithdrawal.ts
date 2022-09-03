import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions } from '@apollo/client/react';
import { MutableRefObject, useCallback, useRef } from 'react';

import { ConfirmModalElement } from '@src/components/ConfirmModal';
import { useWithdrawalMutation } from '@src/operations/mutations/withdrawal';
import { Mutation } from '@src/types/graphql';

const useWithdrawal = (): {
  confirmModalRef: MutableRefObject<ConfirmModalElement | null>;
  handleConfirm: () => void;
  withdrawal: (
    options?: MutationFunctionOptions<Pick<Mutation, 'withdrawal'>>,
  ) => Promise<FetchResult<Pick<Mutation, 'withdrawal'>>>;
  loading: boolean;
} => {
  const confirmModalRef = useRef<ConfirmModalElement | null>(null);
  const handleConfirm = useCallback(() => confirmModalRef.current?.show(), []);
  const [withdrawal, { loading }] = useWithdrawalMutation();

  return {
    confirmModalRef,
    handleConfirm,
    withdrawal,
    loading,
  };
};

export default useWithdrawal;
