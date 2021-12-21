import { useQuery } from '@apollo/client';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { groupBy } from 'lodash';
import React, { useState } from 'react';
import { FlatList } from 'react-native';

import Loader from '@src/components/Loader';
import Tab from '@src/components/Tab';
import Tabs from '@src/components/Tabs';
import Text from '@src/components/Text';
import TrainingModal from '@src/components/TrainingModal';
import { getTrainingTypeForKorean } from '@src/functions';
import { TRAININGS } from '@src/operations/queries/trainings';
import useTrainingEvents from '@src/screens/AddTrainingScreen/hooks/useTrainingEvents';
import { Query, Training, TrainingType } from '@src/types/graphql';
import {
  PlanningStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

import useInfoModal from './hooks/useInfoModal';
import {
  AddButton,
  Container,
  InfoButton,
  TrainingContainer,
  TrainingImage,
} from './styled';

type P = CompositeScreenProps<
  NativeStackScreenProps<PlanningStackParamList, 'AddTraining'>,
  NativeStackScreenProps<RootStackParamList>
>;

const AddTrainingScreen: React.FC<P> = ({ navigation, route }) => {
  const { data, loading } = useQuery<Pick<Query, 'trainings'>>(TRAININGS);
  const groupByTrainings = groupBy<Training>(
    data?.trainings
      .slice()
      .sort((a, b) => Number(b.preference) - Number(a.preference)),
    'type',
  );
  const [selectedTrainings, setSelectedTrainings] = useState<Training[]>([]);
  const [visibleTraining, setVisibleTraining] = useState<Training | undefined>(
    undefined,
  );
  const { toggleTraining, addTrainings } = useTrainingEvents(
    navigation,
    route,
    selectedTrainings,
    setSelectedTrainings,
  );
  const { showInfoModal, hideInfoModal } = useInfoModal(setVisibleTraining);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Tabs>
        {Object.entries(groupByTrainings).map(([type, trainings], index) => (
          <Tab
            key={type}
            title={getTrainingTypeForKorean(type as TrainingType)}
            active={index === 0}>
            <FlatList
              data={trainings}
              renderItem={({ item }) => (
                <TrainingContainer
                  key={item._id}
                  selected={selectedTrainings.some(
                    training => training._id === item._id,
                  )}
                  type="clear"
                  onPress={() => toggleTraining(item)}
                  node={
                    <>
                      <TrainingImage
                        source={
                          item.thumbnailPath
                            ? { uri: item.thumbnailPath }
                            : require('@src/resources/images/mock.png')
                        }
                      />
                      <Text>{item.name}</Text>
                      <InfoButton
                        testID="infoButton"
                        type="clear"
                        onPress={() => showInfoModal(item)}
                        icon={{ name: 'info', color: 'success' }}
                      />
                    </>
                  }
                />
              )}
            />
          </Tab>
        ))}
      </Tabs>

      <AddButton
        onPress={addTrainings}
        title={`운동 추가하기 (${selectedTrainings.length})`}
        disabled={selectedTrainings.length === 0}
      />

      <TrainingModal training={visibleTraining} hide={hideInfoModal} />
    </Container>
  );
};

export default AddTrainingScreen;
