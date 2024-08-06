import * as React from 'react';
import Svg, {Path, G, Polygon} from 'react-native-svg';

export const BackIcon = (props: any) => (
  <Svg width="23px" height="23px" viewBox="0 0 48 48" {...props}>
    <Path d="M0 0h48v48H0z" fill="none" />
    <G id="Shopicon">
      <Polygon points="30.586,6.586 13.171,24 30.586,41.414 33.414,38.586 18.829,24 33.414,9.414  " />
    </G>
  </Svg>
);
