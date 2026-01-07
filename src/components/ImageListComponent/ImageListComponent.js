import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {AppImages} from '../../constants/AppImages';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ImageListComponent = ({image, deleteImage}) => {
  const componentType = () => {
    const split = image?.item?.type?.split('/');
    if (Array.isArray(split)) {
      return split[0];
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          deleteImage(image?.item?.id, image?.item?.name);
        }}
        style={styles.buttonContainer}>
        <Image style={styles.crossButton} source={AppImages.Cross} />
      </TouchableOpacity>
      {componentType() == 'video' && (
        <FontAwesome5 style={styles.playIcon} name="play" />
      )}
      {image.item.loading && (
        <View style={styles.LoadingIcon}>
          <ActivityIndicator />
        </View>
      )}
      <Image
        source={{
          uri: image?.item?.uri,
        }}
        style={styles.imageStyles}
        resizeMode="cover"></Image>
    </View>
  );
};

export default ImageListComponent;
