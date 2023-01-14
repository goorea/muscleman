import { Reducer } from 'react';

const reducer: Reducer<
  { terms: boolean; privacy: boolean },
  { type: 'all' | 'terms' | 'privacy'; action: 'toggle' | 'off' }
> = (prevState, { type, action }) => {
  if (action === 'off') {
    switch (type) {
      case 'terms':
        return { ...prevState, terms: false };
      case 'privacy':
        return { ...prevState, privacy: false };
      default:
        return {
          terms: false,
          privacy: false,
        };
    }
  }

  switch (type) {
    case 'terms':
      return { ...prevState, terms: !prevState.terms };
    case 'privacy':
      return { ...prevState, privacy: !prevState.privacy };
    default:
      return {
        terms: !(prevState.terms && prevState.privacy),
        privacy: !(prevState.terms && prevState.privacy),
      };
  }
};

export default reducer;
