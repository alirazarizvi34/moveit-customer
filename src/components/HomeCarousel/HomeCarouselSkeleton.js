import React, {memo} from 'react';
import {Dimensions} from 'react-native';
import {THEME} from '../../shared/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const {color4E008A, color263238} = THEME.colors;
const width = Dimensions.get('window').width;
const HomeCarouselSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}> 
      <SkeletonPlaceholder.Item alignItems="center">
        <SkeletonPlaceholder.Item width={moderateScale(width - 50)} height={moderateScale(233)} borderRadius={25} marginTop={moderateVerticalScale(27)}/>
        <SkeletonPlaceholder.Item width={moderateScale(16)} height={moderateScale(6)} borderRadius={5} backgroundColor={'gray'} marginTop={moderateVerticalScale(18)} marginBottom={moderateVerticalScale(27)}/>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default memo(HomeCarouselSkeleton);
