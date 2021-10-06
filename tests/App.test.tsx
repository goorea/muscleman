import 'react-native';
import React from 'react';
import App from '@src/App';
import renderer from 'react-test-renderer';

describe('App 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    renderer.create(<App />);
  });
});
