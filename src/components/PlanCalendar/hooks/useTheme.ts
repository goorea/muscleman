import { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { DefaultTheme } from 'react-native-easy-calendar';
import { Theme } from 'react-native-easy-calendar/src/Entities/Theme';

import { useTheme as useProjectTheme } from '@src/contexts/ThemeProvider';

const useTheme = (): { theme: Theme } => {
  const { colors } = useProjectTheme();

  return {
    theme: useMemo<Theme>(
      () => ({
        ...DefaultTheme,
        calendarContainer: {
          minHeight: Dimensions.get('screen').width / 1.34,
          backgroundColor: colors.background,
        },
      }),
      [colors.background],
    ),
  };
};

export default useTheme;
