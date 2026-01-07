import React, {memo, useState} from 'react';
import {Text, View, Dimensions, SafeAreaView, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {getStyles} from './styles';
import {THEME} from '../../shared/theme';

const {color4E008A, color263238} = THEME.colors;
const width = Dimensions.get('window').width;
const HomeCarousel = ({data}) => {
  const {t, i18n} = useTranslation();
  const [index, setCurrentIndex] = useState(0);
  const styles = getStyles({language: i18n.language});

  const CustomPagination = currentIndex => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Carousel
        autoPlay
        width={width - 26}
        height={233}
        pagingEnabled={true}
        snapEnabled={true}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={index => setCurrentIndex(index)}
        renderItem={({item,index}) => (
          <View style={styles.carouselView}>
            <Image
             source={{uri:item?.banner}}
              // source={AppImages.banner1}
              style={styles.carouselImage}
              resizeMode="contain"
            />
            </View>
        )}
      />
      <View style={styles.carouselPaginationMainContainer}>
        {CustomPagination(index)}
      </View>
    </View>
  );
};

export default memo(HomeCarousel);
