import React, { useRef } from 'react';

import OneRMCalculatorModal, {
  OneRMCalculatorModalElement,
} from '@src/components/modals/OneRMCalculatorModal';

import { CalculatorIcon } from './styled';

const HomeOneRMCalculator: React.FC = () => {
  const oneRMCalculatorModalRef = useRef<OneRMCalculatorModalElement | null>(
    null,
  );
  const handlePress = () => oneRMCalculatorModalRef.current?.show();

  return (
    <>
      <CalculatorIcon
        type="clear"
        icon={{ type: 'antdesign', name: 'calculator' }}
        onPress={handlePress}
      />

      <OneRMCalculatorModal ref={oneRMCalculatorModalRef} />
    </>
  );
};

export default HomeOneRMCalculator;
