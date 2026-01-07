import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {AppImages} from '../../constants/AppImages';
import {THEME} from '../../shared/theme';

const {colorWhite, color4E008A} = THEME.colors;
const AvatarCard = ({type, url, image, onPress, icon,camera=true}) => {
  const [onLoadImage, setOnLoadImage] = useState(false);
  return type == 'url' && url ? (
    <ImageBackground
      imageStyle={styles.userImageAvatar}
      source={{uri: url}}
      onLoadStart={() => setOnLoadImage(true)}
      onLoadEnd={() => setOnLoadImage(false)}
      style={[styles.userImage, styles.border]}>
      {onLoadImage && <ActivityIndicator style={styles.imageLoader} />}
      {camera &&
      <TouchableOpacity onPress={onPress} style={styles.plusBtn}>
      <Image
        source={AppImages.CameraIcon}
        resizeMode="contain"
        style={styles.plusIcon}
      />
    </TouchableOpacity>
      }
      
    </ImageBackground>
  ) : (
    <ImageBackground
      imageStyle={styles.userImageAvatar}
      source={image}
      style={[styles.userImage, styles.border]}>
        {camera && 
         <TouchableOpacity onPress={onPress} style={styles.plusBtn}>
         <Image
           source={AppImages.CameraIcon}
           resizeMode="contain"
           style={styles.plusIcon}
         />
       </TouchableOpacity>
        }
     
    </ImageBackground>
  );
};

export default AvatarCard;

const styles = StyleSheet.create({
  userImage: {
    height: moderateScale(102),

    width: moderateScale(102),
    borderRadius: moderateScale(100),
    justifyContent: 'flex-end',
  },
  border: {
    borderWidth: 1,
    borderColor: color4E008A,
  },
  plusIcon: {
    height: moderateVerticalScale(20),
    width: moderateScale(20),
  },
  userImageAvatar: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(100),
    backgroundColor:colorWhite,
  },
  plusBtn: {
    // position: "absolute",
    marginRight: moderateScale(-5),
    marginBottom: moderateVerticalScale(10),
    zIndex: 999,
    alignSelf: 'flex-end',
    borderRadius: moderateScale(20),
    padding: moderateScale(2),
    backgroundColor: colorWhite,
  },
  imageLoader: {
    position:"absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
    borderRadius: moderateScale(100),
  },
});
