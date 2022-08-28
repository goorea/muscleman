import React, { Children, ReactElement, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { TabProps } from '@src/components/Tab';

import { TabContainer, TabsContainer } from './styled';

type P = {
  children: ReactElement<TabProps, 'Tab'>[];
};

const Tabs: React.FC<P> = ({ children }) => {
  const contentsAnimation = useRef<Animated.Value>(
    new Animated.Value(1),
  ).current;
  const actives: boolean[] = Children.map<
    boolean,
    ReactElement<TabProps, 'Tab'>
  >(children, ({ props }) => props.active);
  const [activeIndex, setActiveIndex] = useState<number>(actives.indexOf(true));
  const onTab = (index: number) => {
    setActiveIndex(index);
    contentsAnimation.setValue(0);
    Animated.timing(contentsAnimation, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <TabsContainer horizontal={true}>
        {Children.map<ReactElement, ReactElement<TabProps, 'Tab'>>(
          children,
          ({ props }, index) => (
            <TabContainer
              key={index}
              type="clear"
              color="white"
              onPress={() => onTab(index)}
              title={props.title}
              weight={activeIndex === index ? 'bold' : 'normal'}
            />
          ),
        )}
      </TabsContainer>

      <Animated.View
        style={{
          opacity: contentsAnimation,
        }}>
        {children[activeIndex]}
      </Animated.View>
    </>
  );
};

export default Tabs;
