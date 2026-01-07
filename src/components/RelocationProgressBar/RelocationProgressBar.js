import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {moderateScale, scale} from 'react-native-size-matters';
import * as Progress from 'react-native-progress';
import {colorTheme} from '../../constants/ColorConstants';
import {THEME} from '../../shared/theme';

const {
  defaultBackground,
  disableBackground,
  secondaryText,
  primaryText,
  primaryBorder,
  primaryBackground,
} = colorTheme;
const {latoHeavy, latoBold} = THEME.fonts;
const RelocationProgressBar = ({progressCount}) => {
  const screenWidth = Dimensions.get('window').width;
  const progressArray = [1, 2, 3, 4, 5];
  const progressHandler = progress => {
    if (progress < progressCount) {
      return 1;
    } else if (progress == progressCount) {
      return 0.5;
    } else {
      return 0;
    }
  };

  const activeStatus = progress => {
    if (progress <= progressCount) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <View style={styles.container}>
      {progressArray.map((progress, index) => {
        return (
          <View key={index} style={styles.stepContainer}>
            <View
              style={[
                styles.progressCircle,
                {
                  backgroundColor: activeStatus(progress)
                    ? primaryBackground
                    : defaultBackground,
                },
              ]}>
              <Text
                style={[
                  styles.progressText,
                  {
                    color: activeStatus(progress) ? secondaryText : primaryText,
                    fontFamily: activeStatus(progress) ? latoHeavy : latoBold,
                  },
                ]}>
                {progress}
              </Text>
            </View>
            {index + 1 <= progressArray.length - 1 && (
              <View style={styles.barContainer}>
                <Progress.Bar
                  unfilledColor={disableBackground}
                  height={2}
                  color={primaryBackground}
                  borderWidth={0}
                  progress={progressHandler(progress)}
                  width={screenWidth * 0.13}
                  style={{marginLeft: -1}}
                  animated={false}
                />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default RelocationProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: moderateScale(27),
  },
  stepContainer: {flexDirection: 'row'},
  progressBar: {
    borderRadius: moderateScale(10),
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderWidth: 0,
    marginHorizontal: moderateScale(4),
  },
  progressCircle: {
    height: moderateScale(21),
    width: moderateScale(21),
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: primaryBorder,
    borderRadius: 21,
  },
  barContainer: {justifyContent: 'center'},
  progressText: {
    fontSize: scale(10),
  },
});
