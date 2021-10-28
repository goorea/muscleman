import React from 'react';
import Svg, { Polygon } from 'react-native-svg';

type P = {
  size?: number;
};

const NaverIcon: React.FC<P> = ({ size = 20 }) => (
  <Svg width={size} height={size * 0.9142857143} viewBox="0 0 28 25.6">
    <Polygon
      fill="#fff"
      points="18.5,0 18.5,12.9 9.6,0 0,0 0,25.7 9.6,25.7 9.6,12.7 18.4,25.7 28,25.7 28,0 "
    />
  </Svg>
);

export default NaverIcon;
