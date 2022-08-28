import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useRecoilValue } from 'recoil';

import { userState } from '@src/recoils';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

import useFirstItem from './hooks/useFirstItem';
import useLoginItem from './hooks/useLoginItem';
import { Bullet, Bullets } from './styled';

type P = {
  navigation: CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
  >['navigation'];
};

const HomeCarousel: React.FC<P> = ({ navigation }) => {
  const user = useRecoilValue(userState);
  const [carouslActiveIndex, setCarouselActiveIndex] = useState<number>(0);
  const onBeforeSnapToItem = (index: number) => setCarouselActiveIndex(index);
  const loginItem = useLoginItem(navigation);
  const firstItem = useFirstItem(loginItem, user);
  const items = [firstItem];

  return (
    <>
      <Carousel
        data={items}
        sliderWidth={Dimensions.get('screen').width - 40}
        itemWidth={Dimensions.get('screen').width - 40}
        onBeforeSnapToItem={onBeforeSnapToItem}
        renderItem={({ item }) => item}
      />

      {items.length > 1 && (
        <Bullets>
          {items.map((_, index) => (
            <Bullet key={index} active={carouslActiveIndex === index} />
          ))}
        </Bullets>
      )}
    </>
  );
};

export default HomeCarousel;
