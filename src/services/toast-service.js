import Toast from 'react-native-simple-toast';
import crashlytics from '@react-native-firebase/crashlytics';

class ToastService {
  shortToast = msg => {
    try {
      Toast.show(`${msg}`, Toast.SHORT);
    } catch (err) {
      crashlytics().recordError(err,`${msg} short `);
    }
  };

  longToast = msg => {
    try{

        Toast.show(`${msg}`, Toast.LONG);
    }catch(err){
        crashlytics().recordError(err,`${msg} long `);
    }
  };
}

export default new ToastService();
