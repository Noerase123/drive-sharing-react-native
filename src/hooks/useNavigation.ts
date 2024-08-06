import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../types/Navigation';

export function useNavigate() {
  return useNavigation<Navigation>();
}
