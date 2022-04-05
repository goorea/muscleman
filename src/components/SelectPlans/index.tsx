import dayjs from 'dayjs';
import React from 'react';
import Collapsible from 'react-native-collapsible';

import Button from '@src/components/Button';
import SelectPlan from '@src/components/SelectPlan';
import Text from '@src/components/Text';
import useIconProps from '@src/hooks/useIconProps';
import { Plan } from '@src/types/graphql';

import useCollapse from './hooks/useCollapse';
import useSelect from './hooks/useSelect';
import { ButtonGroup, Container, ToggleButtonWrapper } from './styled';

type P = {
  plannedAt: string;
  plans: Plan[];
};

const SelectPlans: React.FC<P> = ({ plannedAt, plans }) => {
  const { collapsed, toggleCollapse } = useCollapse();
  const { selected, onToggleSelect } = useSelect(plans);
  const { completeIconProps } = useIconProps(selected);

  return (
    <Container>
      <Button
        onPress={toggleCollapse}
        type="clear"
        node={
          <ToggleButtonWrapper>
            <Text>{dayjs(plannedAt).format('YYYY년 MMMM D일 dddd')}</Text>
            <ButtonGroup>
              <Button
                onPress={onToggleSelect}
                type="clear"
                icon={completeIconProps}
              />
              <Button
                onPress={toggleCollapse}
                type="clear"
                icon={{
                  type: 'material',
                  name: collapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up',
                }}
              />
            </ButtonGroup>
          </ToggleButtonWrapper>
        }
      />

      <Collapsible collapsed={collapsed}>
        {plans.map(plan => (
          <SelectPlan key={plan._id} plan={plan} />
        ))}
      </Collapsible>
    </Container>
  );
};

export default SelectPlans;
