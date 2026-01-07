import React, {useContext, useEffect, useState} from 'react';
import {
  Linking,
  Animated,
  PanResponder,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {AppImages} from '../../constants/AppImages';
import {useTranslation} from 'react-i18next';
import {AppConstants} from '../../constants/AppConstants';
import {useIsFocused} from '@react-navigation/native';
import {GlobalContext} from '../../../context/GlobalState';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import { Ionicons } from '@expo/vector-icons';
const DraggableFAB = ({draggableHeight=null}) => {
  const [position] = useState(new Animated.ValueXY());
  const {i18n} = useTranslation();
  const {bootMeUpData, fabPosition, setFabPosition} = useContext(GlobalContext);
  const styles = getStyles(i18n.language,draggableHeight);

  const focused = useIsFocused();
  useEffect(() => {
    getInitialFabPosition();
  }, []);


  useEffect(() => {
    if (fabPosition?.y !== position?.y) {
      position.setValue({
        x: fabPosition.x,
        y: fabPosition.y,
      });
    }
  }, [focused]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: (event, gesture) => {
      let positionY = fabPosition.y + gesture.dy;
      if (positionY > -500 && positionY < 5) {
        position.setValue({
          x: fabPosition.x,
          y: fabPosition.y + gesture.dy,
        });
      }
    },
    onPanResponderRelease: (event, gesture) => {
      setFabPosition({
        x: fabPosition.x,
        y: fabPosition.y + gesture.dy,
      });
      // Reset the vertical position after dragging
      // position.setValue({ x: 0, y: 0 });
      // setFabPosition({x: fabPosition.x, y: fabPosition.y+ gesture.dy});

      // Check if it's a click on TouchableOpacity after dragging
      if (Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5) {
        openWhatsapp();
      }
    },
  });

  const getInitialFabPosition = async () => {
    try {
      const savedFabPosition = {...fabPosition};
      if (savedFabPosition) {
        position.setValue({
          x: savedFabPosition.x,
          y: savedFabPosition.y,
        });
      }
    } catch (error) {}
  };
  const fabStyle = {
    transform: [{translateY: position.y}],
  };
  const positionFab = () => {
    if (i18n.language == 'urdu') {
      return {left: 20};
    } else {
      return {right: 20};
    }
  };
  const openWhatsapp = () => {
    Linking.openURL(
      'http://api.whatsapp.com/send?phone=' + bootMeUpData?.support_no,
    );
  };
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.fabContainer, positionFab(), fabStyle]}>
      <TouchableOpacity
        // onPressIn={openWhatsapp}
        onPress={openWhatsapp}
        activeOpacity={AppConstants?.buttonActiveOpacity}
        style={styles.fabButton}>
        <Image source={AppImages.Whatsapp} style={styles.fabImage} />
      </TouchableOpacity>
    </Animated.View>
  );
};
const getStyles = (language,draggableHeight) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      zIndex: 9999999,
      padding: 16,
    },
    fabContainer: {
      position: 'absolute',
      bottom: draggableHeight ?? 45,
      zIndex: 999,
      // right: language == "urdu" ? 0 : 20,
      // left: language == "urdu" ? 20 : 0,
    },
    fabButton: {
      // backgroundColor: 'blue',
      borderRadius: 25,
      width: 60,
      height: 60,
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fabImage: {
      height: 55,
      width: 55,
    },
  });
export default DraggableFAB;
