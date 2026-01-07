import React, {memo} from 'react';
import {View,Modal,ActivityIndicator,Text} from 'react-native';

const LoaderModal = ({load,textShow=true}) => {
  return (
    <Modal transparent={true} visible={load}>
      {textShow && 
      <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}>
      <ActivityIndicator size={60} color="#FFF" />
      <Text style={{fontSize: 18, color: '#FFF'}}>Please Wait</Text>
    </View>
      }
    </Modal>
  );
};
// export default memo(LoaderModal);
export default LoaderModal;
