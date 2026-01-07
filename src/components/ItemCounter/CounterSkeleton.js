import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CounterSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={{flexDirection: 'row', gap: 20}}>
        <View style={{width: 22, height: 22, borderRadius: 22}} />
        <View style={{width: 5, height: 22, borderRadius: 22}} />
        <View style={{width: 22, height: 22, borderRadius: 22}} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default CounterSkeleton;
