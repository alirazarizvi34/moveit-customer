import React, {memo} from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import {colorTheme} from '../../constants/ColorConstants';
import {View, Text, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {THEME} from '../../shared/theme';
import ButtonComponent from '../buttonComp/ButtonComponent';

const {
  defaultBackground,
  defaultText,
  toolTipInfoBackground,
  primaryText,
  secondaryBackground,
  primaryBackground,
  secondaryText
} = colorTheme;
const {latoMedium, latoSemiBold} = THEME.fonts;

const ToolTipComponent = ({
  children,
  placement = 'bottom',
  isVisible,
  hasList = false,
  contentText,
  contentHeight = null,
  contentWidth = null,
  onPressForward,
  onPressBack,
  btnText,
  hasSteps,
  stepCounter,
  isFinal
}) => {
  const styles = getStyles(isVisible, contentHeight, contentWidth, placement, isFinal);

  const contentTextHandler = () => {
    return contentText.map(({title}, index) => {
      return (
        <View style={{flexDirection: 'row', gap: 4}} key={index}>
          {hasList && <Text style={styles.contentText}>{index + 1}.</Text>}
          <Text style={styles.contentText}>{title}</Text>
        </View>
      );
    });
  };
  return (
    <Tooltip
      isVisible={isVisible}
      arrowStyle={styles.arrowStyle}
      contentStyle={{backgroundColor: toolTipInfoBackground}}
      useInteractionManager={true}
      content={
        <View style={styles.contentView}>
          <View style={styles.contentTxtView}>
          {contentText && contentTextHandler()}
          </View>
          <View style={styles.bottomButtonView}>
            <View style={styles.stepCounterView}>
            <Text style={styles.stepText}>{hasSteps && stepCounter}</Text>
            </View>
            {onPressForward && onPressBack ? (
              <>
                <ButtonComponent
                  disabled={false}
                  icon={{
                    name: 'angle-left',
                    color: primaryBackground,
                    size: scale(18),
                  }}
                  btnStyle={styles.btnStyle}
                  onPress={onPressBack}
                />
                <ButtonComponent
                  disabled={false}
                  icon={{
                    name: 'angle-right',
                    color: primaryBackground,
                    size: scale(18),
                  }}
                  btnStyle={styles.btnStyle}
                  onPress={onPressForward}
                />
              </>
            ) : (
              <>
                {btnText ? (
                  <ButtonComponent
                    disabled={false}
                    text={btnText}
                    textStyle={styles.btnTextStyle}
                    btnStyle={styles.btnContainer}
                    onPress={onPressForward}
                  />
                ) : (
                  <ButtonComponent
                    disabled={false}
                    icon={{
                      name: 'angle-right',
                      color: primaryBackground,
                      size: scale(18),
                    }}
                    btnStyle={styles.btnStyle}
                    onPress={onPressForward}
                  />
                )}
              </>
            )}
          </View>
        </View>
      }
      placement={placement}
      tooltipStyle={styles.tooltipStyle}
      onClose={() => {}}>
      {children}
    </Tooltip>
  );
}
export default memo(ToolTipComponent);

const getStyles = (isVisible, contentHeight, contentWidth, placement, isFinal) =>
  StyleSheet.create({
    arrowStyle: {
      left: 10,
    },
    contentView: {
      height: '100%',
      width: contentWidth ? contentWidth : 244,
      backgroundColor: defaultBackground,
      borderTopLeftRadius: placement == 'top' ? 10 : 40,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: placement == 'top' ? 40 : 10,
      borderBottomRightRadius: 10,
      paddingTop: placement == 'top' ? 12 : 25,
      paddingHorizontal: 14,
      gap: 20,
    },
    tooltipStyle: {
      color: 'red',
      marginLeft: -20,
    },
    contentText: {
      fontSize: scale(12),
      fontFamily: latoMedium,
      color: primaryText,
    },
    bottomButtonView: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
      marginBottom: moderateVerticalScale(16),
    },
    btnStyle: {
      width: moderateScale(36),
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      height: moderateScale(22),
      borderRadius: 8,
      paddingLeft: moderateScale(3),
      backgroundColor: secondaryBackground,
    },
    btnContainer: {
      width: isFinal ? moderateScale(80) : moderateScale(63),
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      height: moderateScale(22),
      borderRadius: 8,
      paddingLeft: moderateScale(3),
      backgroundColor: isFinal ? primaryBackground : secondaryBackground,
    },
    btnTextStyle: {
      fontSize: scale(10),
      fontFamily: latoSemiBold,
      color: isFinal ? secondaryText : primaryText,
    },
    stepCounterView: {
      flex:1,
    },
    stepText: {
      fontSize: scale(12),
      fontFamily: latoSemiBold,
    },
    contentTxtView: {
      gap:10
    }
  });
