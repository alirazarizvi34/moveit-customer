import {View, Text, StyleSheet, Image} from 'react-native';
import React, {memo} from 'react';
import {THEME} from '../../shared/theme';
import {moderateScale, scale} from 'react-native-size-matters';
import ItemCounter from '../ItemCounter/ItemCounter';
import {colorTheme} from '../../constants/ColorConstants';
import {AppImages} from '../../constants/AppImages';

const RelocationItemsDetailListComponent = ({
  itemDetail,
  onIncreaseCount,
  onDecreaseCount,
}) => {
  const {name, count, description, is_fragile} = itemDetail;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              {name}
            </Text>
            {description && (
              <Text style={styles.description} numberOfLines={2}>
                ({description})
              </Text>
            )}
          </View>
          {is_fragile === 1 && (
            <Image
              source={AppImages?.fragile}
              resizeMode="contain"
              style={styles.fragileIcon}
            />
          )}
        </View>
      </View>

      <View style={styles.counterContainer}>
        <ItemCounter
          onDecreaseCount={onDecreaseCount}
          onIncreaseCount={onIncreaseCount}
          count={count}
        />
      </View>
    </View>
  );
};

export default memo(RelocationItemsDetailListComponent);

const {latoSemiBold, latoBold, latoRegular, latoItalic} = THEME.fonts;
const {primaryText} = colorTheme;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '45%',
  },
  title: {
    fontSize: scale(12),
    fontFamily: latoBold,
    color: primaryText,
  },
  counterContainer: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  description: {
    fontFamily: latoItalic,
    fontSize: scale(8),
    color: primaryText,
  },
  fragileIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
});
