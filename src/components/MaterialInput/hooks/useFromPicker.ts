import { Dispatch, SetStateAction, useEffect } from 'react';

const useFromPicker = (
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  value?: string,
) => {
  useEffect(() => {
    if (value && !active) {
      setActive(true);
    }
  }, [value, active, setActive]);
};

export default useFromPicker;
