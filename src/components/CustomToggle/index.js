//this is custome switch and this component is not using another component
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { THEME } from '../../shared/theme';


const { colorD9D9D9, color949494, color898A8D, color4E008A, colorBlack, colorF6F6F6, validateColor, color575757, colorF0F0F0, color0F0F0F, colorB0B0C3, colorRed, colorGray, colorBorder, priTxtColor, grayTxtColor, priBorderColor, sectionBgColor, touchBgColor, touchBorderColor, touchTxtolor } = THEME.colors;

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 24,
          width: 48,
          backgroundColor: colorD9D9D9,
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == 1 ? selectionColor : colorD9D9D9,
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text
            style={{
              color: getSelectionMode == 1 ? 'white' : selectionColor,
            }}>
            {option1}
          </Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == 2 ? selectionColor : 'white',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text
            style={{
              color: getSelectionMode == 2 ? 'white' : selectionColor,
            }}>
            {option2}
          </Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;