/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Player from '../src/components/player';
// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<Player />);
});
