import { isEqual } from 'lodash';
import React from 'react';
import FastImage, { ImageStyle, Source } from 'react-native-fast-image';

type P = {
  source: Source | number;
  style?: ImageStyle;
};

const Image: React.FC<P> = ({ source, style }) => {
  return (
    <FastImage
      source={source}
      style={style}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default React.memo(Image, isEqual);
