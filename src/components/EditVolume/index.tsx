import React from 'react';

import Text from '@src/components/Text';
import useIconProps from '@src/hooks/useIconProps';
import { EditingVolume } from '@src/types';

import useEvents from './hooks/useEvents';
import {
  DragVolumeButton,
  FilledText,
  IconButton,
  SetButtonGroup,
  VolumeContainer,
} from './styled';

type P = {
  editingVolume: EditingVolume;
  planID: string;
  index: number;
  drag: () => void;
};

const EditVolume: React.FC<P> = ({ editingVolume, planID, index, drag }) => {
  const { dragIconProps, completeIconProps, deleteIconProps } = useIconProps(
    editingVolume.complete,
  );
  const { selected, select, toggleComplete, deleteVolume } = useEvents(
    editingVolume,
    planID,
  );

  return (
    <VolumeContainer
      testID="volumeContainer"
      isFirst={index === 0}
      onPress={select}
      selected={selected}>
      <DragVolumeButton
        testID="dragButton"
        type="clear"
        onLongPress={drag}
        icon={dragIconProps}
        disabled={selected}
      />
      <Text weight="bold" italic={true}>
        {(index || 0) + 1}Set
      </Text>
      <FilledText>{editingVolume.weight}kg</FilledText>
      <FilledText>{editingVolume.count}개</FilledText>
      <SetButtonGroup>
        <IconButton
          testID="toggleButton"
          type="clear"
          onPress={toggleComplete}
          icon={completeIconProps}
        />
        <IconButton
          testID="deleteButton"
          type="clear"
          onPress={deleteVolume}
          icon={deleteIconProps}
        />
      </SetButtonGroup>
    </VolumeContainer>
  );
};

export default EditVolume;
