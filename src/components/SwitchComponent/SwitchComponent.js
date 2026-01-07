import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  I18nManager,
  Image,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateVerticalScale, scale} from 'react-native-size-matters';

const styles = {
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animated: {
    borderWidth: 0,
    position: 'absolute',
  },
};

const SwitchSelector = ({
  style = {},
  options = [],
  borderColor = '#C9C9C9',
  borderRadius = 50,
  borderWidth = 1,
  hasPadding = false,
  valuePadding = 1,
  height = 40,
  bold = false,
  buttonMargin = 0,
  buttonColor = '',
  returnObject = false,
  animationDuration = 100,
  disabled = false,
  disableValueChangeOnPress = false,
  initial = -1,
  value = 1,
  onPress = null,
  accessibilityLabel = null,
  testID = null,
  touchableProps = {},
}) => {
  const [selected, setSelected] = useState(initial);
  const sliderWidth = useRef(null);

  const animatedValue = useRef(
    new Animated.Value(
      initial
        ? I18nManager.isRTL
          ? -(initial / options.length)
          : initial / options.length
        : 0,
    ),
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd,
    }),
  ).current;

  const getSwipeDirection = gestureState => {
    const {dx, dy, vx} = gestureState;
    // 0.1 velocity
    if (Math.abs(vx) > 0.1 && Math.abs(dy) < 80) {
      return dx > 0 ? 'RIGHT' : 'LEFT';
    }
    return null;
  };

  const getBgColor = () => {
    if (selected === -1) {
      return 'transparent';
    }
    return options[selected]?.activeColor || buttonColor;
  };

  const responderEnd = (_, gestureState) => {
    if (disabled) return;
    const swipeDirection = getSwipeDirection(gestureState);
    if (swipeDirection === 'RIGHT' && selected < options.length - 1) {
      toggleItem(selected + 1);
    } else if (swipeDirection === 'LEFT' && selected > 0) {
      toggleItem(selected - 1);
    }
  };

  const shouldSetResponder = (_, gestureState) =>
    gestureState.dx !== 0 && gestureState.dy !== 0;

  const animate = (value, last) => {
    animatedValue.setValue(last);
    Animated.timing(animatedValue, {
      toValue: value,
      duration: animationDuration,
      easing: Easing.cubic,
      useNativeDriver: false,
    }).start();
  };

  const toggleItem = (index, callOnPress = true) => {
    if (options.length <= 1 || index === null || isNaN(index)) return;
    animate(
      I18nManager.isRTL ? -(index / options.length) : index / options.length,
      I18nManager.isRTL
        ? -(selected / options.length)
        : selected / options.length,
    );
    if (callOnPress && onPress) {
      onPress(returnObject ? options[index] : options[index].value);
    } else {
    }
    setSelected(index);
  };

  const optionsMap = options.map((element, index) => {
    const isSelected = selected === index;

    return (
      <TouchableOpacity
        {...touchableProps}
        key={index}
        disabled={disabled || element.disabled}
        style={[
          styles.button,
          isSelected
            ? {backgroundColor: 'yellow'}
            : {backgroundColor: 'orange'},
        ]}
        onPress={() => toggleItem(index)}
        accessibilityLabel={element.accessibilityLabel}
        testID={element.testID}>
        <Text style={{color: 'red', fontSize: scale(8)}}>{element.label}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View
      style={[{flexDirection: 'row'}, style]}
      accessibilityLabel={accessibilityLabel}
      testID={testID}>
      <View {...panResponder.panHandlers} style={{flex: 1}}>
        <View
          style={{
            borderRadius,
            height: height + buttonMargin * 2,
          }}
          onLayout={event => {
            const {width} = event.nativeEvent.layout;
            sliderWidth.current = width - (hasPadding ? 2 : 0);
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderColor,
              borderRadius,
              borderWidth: hasPadding ? borderWidth : 0,
              alignItems: 'center',
            }}>
            {!!sliderWidth.current && (
              <Animated.View
                style={[
                  {
                    height: moderateVerticalScale(20),
                    backgroundColor: 'red',
                    width: buttonMargin * 2,
                    transform: [
                      {
                        translateX: animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            hasPadding ? valuePadding : 0,
                            sliderWidth.current -
                              (hasPadding ? valuePadding : 0),
                          ],
                        }),
                      },
                    ],
                    borderRadius,
                    margin: buttonMargin,
                  },
                  styles.animated,
                ]}
              />
            )}
            {optionsMap}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SwitchSelector;
