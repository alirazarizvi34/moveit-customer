import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CounterSkeleton from '../ItemCounter/CounterSkeleton';
import {moderateScale} from 'react-native-size-matters';

const RelocationDetailListSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={styles.mainRow}>
        <View style={styles.title} />
        <View style={styles.counterRow}>
          <View style={styles.btn} />
          <View style={styles.text} />
          <View style={styles.btn} />
        </View>
      </View>
      <View style={styles.mainRow}>
        <View style={styles.title} />
        <View style={styles.counterRow}>
          <View style={styles.btn} />
          <View style={styles.text} />
          <View style={styles.btn} />
        </View>
      </View>
      <View style={styles.mainRow}>
        <View style={styles.title} />
        <View style={styles.counterRow}>
          <View style={styles.btn} />
          <View style={styles.text} />
          <View style={styles.btn} />
        </View>
      </View>
      <View style={styles.mainRow}>
        <View style={styles.title} />
        <View style={styles.counterRow}>
          <View style={styles.btn} />
          <View style={styles.text} />
          <View style={styles.btn} />
        </View>
      </View>
      <View style={styles.mainRow}>
        <View style={styles.title} />
        <View style={styles.counterRow}>
          <View style={styles.btn} />
          <View style={styles.text} />
          <View style={styles.btn} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default RelocationDetailListSkeleton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  btn: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: 2,
  },
  text: {
    width: moderateScale(12),
    height: moderateScale(22),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(16),
  },
  counterRow: {
    flexDirection: 'row',
    width: moderateScale(140),
    justifyContent: 'flex-end',
    marginRight: moderateScale(8),
  },
  title: {
    width: moderateScale(150),
    height: moderateScale(17),
    borderRadius: moderateScale(50),
    alignSelf: 'center',
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(17),
  },
});
