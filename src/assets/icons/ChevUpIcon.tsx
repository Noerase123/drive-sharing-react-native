import * as React from 'react';
import Svg, {Path, G, Polygon} from 'react-native-svg';

export const ChevUpIcon = (props: any) => (
  <Svg width="20px" height="20px" viewBox="0 0 48 48" {...props}>
    <Path d="M0 0h48v48H0z" fill="none" />
    <G id="Shopicon">
      <G>
        <Polygon points="6.586,30.585 9.414,33.413 24,18.827 38.586,33.413 41.414,30.585 24,13.171  " />
      </G>
    </G>
  </Svg>
);
