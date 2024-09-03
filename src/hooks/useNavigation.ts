import {useNavigation, useRoute} from '@react-navigation/native';
import {Navigation} from '../types/Navigation';

export function useNavigate() {
  return useNavigation<Navigation>();
}

export function useRouter() {
  return useRoute<any>();
}
