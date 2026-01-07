import React, { memo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { ColorConstants, colorTheme } from '../../constants/ColorConstants';
import { AppFonts } from '../../constants/AppFonts';
import { moderateScale, scale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import { THEME } from '../../shared/theme';

const {defaultText,primaryBorder,primaryText,disableText,lightPurpleBackground,primaryBackground} = colorTheme;
const {latoSemiBold, latoRegular, latoBold, jameelNooriNastaleeq, latoHeavy, latoMedium} =
  THEME.fonts;

const SegmentedTab = ({ selectedIndex, setSelectedIndex }) => {
  const { t } = useTranslation()
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // For multi select SegmentedControlTab
  const handleSingleIndexSelect = (index) => {
    // For single Tab Selection SegmentedControlTab
    setSelectedIndex(index);
  };
  return (
    <SegmentedControlTab
      values={[t('Pickup'), t('Drop-off')]}
      selectedIndex={selectedIndex}
      tabStyle={styles.tabStyle}
      activeTabStyle={styles.activeTabStyle}
      borderRadius={10}
      activeTabTextStyle={styles.activeTabTextStyle}
      tabTextStyle={styles.tabTextStyle}
      onTabPress={handleSingleIndexSelect}
    />
  );
};
export default memo(SegmentedTab)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tabTextStyle: {
    fontSize: scale(12),
    fontFamily: latoBold,
    textAlign: 'center',
    lineHeight: 18,
    color: disableText
  },
  tabStyle: {
    borderWidth:0,
    height: moderateScale(40),
    borderRadius: moderateScale(8),
    marginHorizontal: moderateScale(-10),
    backgroundColor: lightPurpleBackground
  },
  activeTabTextStyle: {
    fontFamily: latoHeavy,
  },
  activeTabStyle: {
    backgroundColor: primaryBackground,
    borderColor: primaryBorder,
    borderRadius: moderateScale(8),
    zIndex: 9999,
  },
});