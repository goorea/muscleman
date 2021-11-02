import React from 'react';
import { GestureResponderEvent } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IonIocn from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import OctIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

import { useTheme } from '@src/contexts/ThemeProvider';
import { Colors } from '@src/types/theme';

type IconType =
  | 'material'
  | 'material-community'
  | 'simple-line-icon'
  | 'zocial'
  | 'font-awesome'
  | 'octicon'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'antdesign'
  | 'font-awesome-5';

export type IconProps = {
  name: string;
  type?: IconType;
  size?: number;
  color?: keyof Colors;
  onPress?: (event: GestureResponderEvent) => void;
};

const Icon: React.FC<IconProps> = ({
  name,
  type,
  size = 24,
  color = 'foreground',
  onPress,
}) => {
  const { colors } = useTheme();
  const props = {
    name,
    type,
    size,
    color: colors[color],
    onPress,
  };

  switch (type) {
    case 'material-community':
      return <MaterialCommunityIcon {...props} />;
    case 'simple-line-icon':
      return <SimpleLineIcon {...props} />;
    case 'zocial':
      return <ZocialIcon {...props} />;
    case 'font-awesome':
      return <FontAwesomeIcon {...props} />;
    case 'octicon':
      return <OctIcon {...props} />;
    case 'ionicon':
      return <IonIocn {...props} />;
    case 'foundation':
      return <FoundationIcon {...props} />;
    case 'evilicon':
      return <EvilIcon {...props} />;
    case 'entypo':
      return <EntypoIcon {...props} />;
    case 'antdesign':
      return <AntDesignIcon {...props} />;
    case 'font-awesome-5':
      return <FontAwesome5Icon {...props} />;
    default:
      return <MaterialIcon {...props} />;
  }
};

export default Icon;
