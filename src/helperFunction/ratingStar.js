import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {THEME} from '../shared/theme';

const {
  BorderColor,
  colorWhite,
  color4E008A,
  colorBlack,
  color666666,
  validateColor,
  colorF0F0F0,
  color0F0F0F,
  colorB0B0C3,
  colorCircle,
  colorF8F8F8,
  colorE5E5E5,
  colorBorder,
  colorFFBE50,
  grayTxtColor,
} = THEME.colors;

export const RatingStars = ({initRating, onRatingChanged = () => {}, size}) => {
  let stars = [];
  for (let i = 1; i < 6; i++) {
    if (i <= initRating) {
      stars.push(
        <TouchableOpacity key={i}
          activeOpacity={0.8}
          onPress={() => {
            onRatingChanged(i);
            //   setMyRating(i);
          }}>
          <Icon
            name="star"
            size={size}
            color={colorFFBE50}
            // style={{ marginRight: 2 }}
          ></Icon>
        </TouchableOpacity>,
      );
    } else {
      stars.push(
        <TouchableOpacity key={i}
          activeOpacity={0.8}
          onPress={() => {
            onRatingChanged(i);
            // alert(i);
            //   setMyRating(i);
          }}>
          <Icon
            name="star"
            size={size}
            color="rgba(0, 0, 0, 0.14)"
            // style={{ marginRight: 2 }}
          ></Icon>
        </TouchableOpacity>,
      );
    }
  }
  return stars;
};
