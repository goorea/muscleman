import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export type Unit = '2.5' | '5' | '10';

const useUnit = (): {
  units: Unit[];
  currentUnit: Unit;
  changeUnit: (unit: Unit) => Promise<void>;
} => {
  const units: Unit[] = ['2.5', '5', '10'];
  const [currentUnit, setCurrentUnit] = useState<Unit>('5');
  const changeUnit = useCallback(async (unit: Unit) => {
    setCurrentUnit(unit);
    await AsyncStorage.setItem('@setUnit', unit);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('@setUnit').then(unit => {
      if (unit === '2.5' || unit === '5' || unit === '10') {
        setCurrentUnit(unit);
      }
    });
  }, []);

  return {
    units,
    currentUnit,
    changeUnit,
  };
};

export default useUnit;
