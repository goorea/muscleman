import React from 'react';
import { useRecoilValue } from 'recoil';

import Text from '@src/components/Text';
import { useTheme } from '@src/contexts/ThemeProvider';
import {
  editingPlans,
  selectedEditingVolumeIDState,
} from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan } from '@src/types';

import useAnimation from './hooks/useAnimation';
import useUnit from './hooks/useUnit';
import useVolume from './hooks/useVolume';
import {
  Button,
  ButtonGroup,
  Container,
  Row,
  SmallButton,
  Value,
} from './styled';

type P = {};

const VolumeKeyboard: React.FC<P> = () => {
  const { dark } = useTheme();
  const selectedEditingVolumeID = useRecoilValue<string>(
    selectedEditingVolumeIDState,
  );
  const planID =
    useRecoilValue<EditingPlan[]>(editingPlans).find(plan =>
      plan.volumes.some(({ _id }) => _id === selectedEditingVolumeID),
    )?._id || '';

  const { transform, onLayout } = useAnimation(planID);
  const { units, currentUnit, changeUnit } = useUnit();
  const { close, changeVolume, selectedEditingVolume } = useVolume(planID);

  return (
    <Container onLayout={onLayout} style={{ transform }}>
      <Row>
        <Button color="background" />
        <ButtonGroup dark={dark}>
          {units.map(unit => (
            <SmallButton
              testID={`unitButton${unit}`}
              key={unit}
              onPress={() => changeUnit(unit)}
              type={currentUnit === unit ? 'solid' : 'clear'}
              color="grey2"
              title={unit}
              weight={currentUnit === unit ? 'bold' : 'normal'}
            />
          ))}
        </ButtonGroup>
        <Button onPress={close} title="확인" />
      </Row>
      <Row>
        <Button
          onPress={() => changeVolume('weight', -currentUnit)}
          title={`-${currentUnit}`}
          color={dark ? 'grey0' : 'grey5'}
          titleColor={dark ? 'grey5' : 'grey2'}
        />
        <Button
          onPress={() => changeVolume('weight', -1)}
          title="-1"
          color={dark ? 'grey0' : 'grey5'}
          titleColor={dark ? 'grey5' : 'grey2'}
        />
        <Value weight="bold">
          {selectedEditingVolume?.weight}
          <Text size={12}>kg</Text>
        </Value>
        <Button
          onPress={() => changeVolume('weight', 1)}
          title="+1"
          color={dark ? 'grey0' : 'grey5'}
          titleColor={dark ? 'grey5' : 'grey2'}
        />
        <Button
          onPress={() => changeVolume('weight', +currentUnit)}
          title={`+${currentUnit}`}
          color={dark ? 'grey0' : 'grey5'}
          titleColor={dark ? 'grey5' : 'grey2'}
        />
      </Row>
      <Row>
        <Button
          onPress={() => changeVolume('count', -5)}
          title="-5"
          color={dark ? 'grey0' : 'grey5'}
          titleColor={dark ? 'grey5' : 'grey2'}
        />
        <Button
          onPress={() => changeVolume('count', -1)}
          title="-1"
          color={dark ? 'grey0' : 'grey5'}
          titleColor={dark ? 'grey5' : 'grey2'}
        />
        <Value weight="bold">
          {selectedEditingVolume?.count}
          <Text size={12}>회</Text>
        </Value>
        <Button
          onPress={() => changeVolume('count', 1)}
          title="+1"
          color={dark ? 'grey0' : 'grey5'}
          titleColor={dark ? 'grey5' : 'grey2'}
        />
        <Button
          onPress={() => changeVolume('count', 5)}
          title="+5"
          color={dark ? 'grey0' : 'grey5'}
          titleColor={dark ? 'grey5' : 'grey2'}
        />
      </Row>
    </Container>
  );
};

export default VolumeKeyboard;
