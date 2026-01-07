import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {THEME} from '../../shared/theme';
import {moderateScale, scale} from 'react-native-size-matters';
import {colorTheme} from '../../constants/ColorConstants';

const DetailRow = ({label, description, amount}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={{flex:1,alignItems:'flex-end'}}>
        <Text style={styles.value}>
          {/* PKR {parseInt(amount)?.toLocaleString('en-US')} */}
          PKR {(amount)?.toLocaleString('en-US')}
        </Text>
      </View>
    </View>
  );
};

export default DetailRow;

const {latoBold, latoHeavy} = THEME.fonts;
const {primaryText, defaultText, darkGrayText} = colorTheme;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScale(10),
  },
  headingContainer: {
    flex:0.9
  },
  heading: {
    color: primaryText,
    fontSize: scale(11),
    fontFamily: latoBold,
  },
  description: {
    fontSize: scale(8),
    color: darkGrayText,
    marginTop: Platform.OS == 'android' ? moderateScale(2) : moderateScale(5),
  },
  value: {
    color: defaultText,
    fontFamily: latoHeavy,
    fontSize: scale(10),
  },
});
