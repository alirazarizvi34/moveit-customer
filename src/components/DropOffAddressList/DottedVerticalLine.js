import React from 'react';
import {View} from 'react-native';
import { getStyles } from './DottedVerticalLineStyle';

const DottedVerticalLine = ({ dotCount }) => {

  const styles = getStyles()
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < dotCount; i++) {
      dots.push(<View style={styles.dot} key={i} />);
    }
    return dots;
  };

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>{renderDots()}</View>
    </View>
  );
};

export default DottedVerticalLine;