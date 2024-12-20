import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const InfoIcon = (props: any) => (
  <Svg
    width="35px"
    height="35px"
    viewBox="0 0 76 76"
    baseProfile="full"
    enableBackground="new 0 0 76.00 76.00"
    xmlSpace="preserve"
    {...props}>
    <Path
      fill="#000000"
      fillOpacity={1}
      strokeWidth={0.2}
      strokeLinejoin="round"
      d="M 31.6666,30.0834L 42.7499,30.0834L 42.7499,33.2501L 42.7499,52.2501L 45.9165,52.2501L 45.9165,57.0001L 31.6666,57.0001L 31.6666,52.2501L 34.8332,52.2501L 34.8332,34.8335L 31.6666,34.8335L 31.6666,30.0834 Z M 38.7917,19C 40.9778,19 42.75,20.7722 42.75,22.9583C 42.75,25.1445 40.9778,26.9167 38.7917,26.9167C 36.6055,26.9167 34.8333,25.1445 34.8333,22.9583C 34.8333,20.7722 36.6055,19 38.7917,19 Z "
    />
  </Svg>
);
