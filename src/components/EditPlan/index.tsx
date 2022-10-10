import React from 'react';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { useRecoilValue } from 'recoil';

import EditVolume from '@src/components/EditVolume';
import Icon from '@src/components/Icon';
import { getTrainingTypeForKorean } from '@src/functions';
import useIconProps from '@src/hooks/useIconProps';
import { editingVolumesState } from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan, EditingVolume } from '@src/types';

import useEvents from './hooks/useEvents';
import {
  Container,
  Header,
  IconButton,
  TrainingName,
  HeaderButtonGroup,
  AddSetButton,
  AddSetWrapper,
  AddSetText,
  AddSetContainer,
} from './styled';

type P = {
  editingPlan: EditingPlan;
  drag: () => void;
};

const EditPlan: React.FC<P> = ({ editingPlan, drag }) => {
  const editingVolumes = useRecoilValue<EditingVolume[]>(
    editingVolumesState(editingPlan._id),
  );
  const { dragIconProps, completeIconProps, deleteIconProps } = useIconProps(
    !!editingVolumes.length && editingVolumes.every(volume => volume.complete),
  );
  const { toggleAllComplete, deletePlan, onDragEnd, addVolume } = useEvents(
    editingPlan._id,
  );

  return (
    <Container>
      <Header>
        <TrainingName weight="bold" ellipsis>
          {getTrainingTypeForKorean(editingPlan.training.type)} |{' '}
          {editingPlan.training.name}
        </TrainingName>

        <HeaderButtonGroup>
          <IconButton
            testID="dragButton"
            type="clear"
            onLongPress={drag}
            icon={dragIconProps}
          />
          <IconButton
            testID="toggleButton"
            type="clear"
            onPress={toggleAllComplete}
            icon={completeIconProps}
          />
          <IconButton
            testID="deleteButton"
            type="clear"
            onPress={() => deletePlan(editingPlan._id)}
            icon={deleteIconProps}
          />
        </HeaderButtonGroup>
      </Header>

      <DraggableFlatList
        data={editingVolumes}
        keyExtractor={item => item._id}
        onDragEnd={onDragEnd}
        renderItem={({
          item,
          index,
          drag: dragVolume,
        }: RenderItemParams<EditingVolume>) => (
          <EditVolume
            editingVolume={item}
            planID={editingPlan._id}
            index={index || 0}
            drag={dragVolume}
          />
        )}
      />

      <AddSetContainer>
        <AddSetButton
          testID="addVolumeButton"
          onPress={addVolume}
          node={
            <AddSetWrapper>
              <Icon type="ionicon" name="add" color="white" size={20} />
              <AddSetText weight="bold" color="white" size={14}>
                세트 추가
              </AddSetText>
            </AddSetWrapper>
          }
        />
      </AddSetContainer>
    </Container>
  );
};

export default EditPlan;
