import {View, Text} from 'react-native';
import React from 'react';

const useCommonFunction = () => {
  function percentage(percent, total) {
    return (percent / 100) * total;
  }
  return {percentage};
};

export default useCommonFunction;
