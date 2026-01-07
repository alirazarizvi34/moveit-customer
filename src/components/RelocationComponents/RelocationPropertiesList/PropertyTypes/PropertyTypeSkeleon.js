import React, {memo} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const width = Dimensions.get('window').width;
const PropertyTypeSkeleon = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        marginBottom={moderateVerticalScale(28)}>
        <SkeletonPlaceholder.Item
          borderRadius={8}
          // marginTop={6}
          width={moderateScale(100)}
          height={moderateScale(34)}
        />
        <SkeletonPlaceholder.Item
          borderRadius={8}
          // marginTop={6}
          marginLeft={12}
          width={moderateScale(100)}
          height={moderateScale(34)}
        />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item borderRadius={8} height={moderateScale(50)} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default memo(PropertyTypeSkeleon);
