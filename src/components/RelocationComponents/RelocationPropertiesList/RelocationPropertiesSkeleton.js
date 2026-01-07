import React, {memo} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {THEME} from '../../../shared/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const DATA = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
];

const {color4E008A, color263238} = THEME.colors;
const width = Dimensions.get('window').width;
const RelocationPropertiesSkeleton = () => {
  return (
    <FlatList
      horizontal
      data={DATA}
      nestedScrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{width: moderateScale(8)}} />}
      renderItem={({item, index}) => {
        return (
          <SkeletonPlaceholder borderRadius={6}>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              lignItems="center"
              alignItems="center"
              >
              <SkeletonPlaceholder.Item
                key={index}
                alignItems="center"
                marginLeft={0}
                marginRight={0}
                paddingVertical={moderateVerticalScale(8)}
                paddingHorizontal={moderateScale(2)}>
                <SkeletonPlaceholder.Item
                  width={moderateScale(98)}
                  height={moderateScale(75)}
                  borderRadius={6}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        );
      }}
      keyExtractor={item => item.id}
    />
  );
};

export default memo(RelocationPropertiesSkeleton);
