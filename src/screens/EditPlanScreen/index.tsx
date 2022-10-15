import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';

import PreviousPlansModal from '@src/components/PreviousPlansModal';
import VolumeKeyboard from '@src/components/VolumeKeyboard';
import { useTheme } from '@src/contexts/ThemeProvider';
import {
  PlanningStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

import useDraggableFlistList from './hooks/useDraggableFlistList';
import useFetch from './hooks/useFetch';
import useIsEditing from './hooks/useIsEditing';
import useLoad from './hooks/useLoad';
import useReset from './hooks/useReset';
import useTraining from './hooks/useTraining';
import {
  AddPlanButton,
  ButtonWrapper,
  Container,
  SubmitButton,
  Wrapper,
} from './styled';

type P = CompositeScreenProps<
  NativeStackScreenProps<PlanningStackParamList, 'EditPlan'>,
  NativeStackScreenProps<RootStackParamList>
>;

const EditPlanScreen: React.FC<P> = ({ navigation, route }) => {
  const { dark } = useTheme();
  const { plannedAt } = route.params;
  const { isEditing } = useIsEditing();
  const { previousPlansModalRef, showPreviousPlans, onLoad } =
    useLoad(plannedAt);
  const { onDragEnd, renderItem, ListHeaderComponent } = useDraggableFlistList(
    plannedAt,
    showPreviousPlans,
  );
  const { addTraining, node } = useTraining({ navigation, route });
  const { loading, editingPlans, submit } = useFetch({ navigation, route });

  useReset(navigation);

  return (
    <>
      <Container dark={dark}>
        <Wrapper isEditing={isEditing}>
          <DraggableFlatList
            showsVerticalScrollIndicator={false}
            data={editingPlans}
            keyExtractor={item => item._id}
            onDragEnd={onDragEnd}
            renderItem={renderItem}
            ListHeaderComponent={ListHeaderComponent}
          />
        </Wrapper>

        <ButtonWrapper>
          <AddPlanButton onPress={addTraining} node={node} />

          <SubmitButton
            testID="submitButton"
            title="확인"
            onPress={submit}
            loading={loading}
          />
        </ButtonWrapper>

        <VolumeKeyboard />
      </Container>

      <PreviousPlansModal
        ref={previousPlansModalRef}
        plannedAt={plannedAt}
        onLoad={onLoad}
      />
    </>
  );
};

export default EditPlanScreen;
