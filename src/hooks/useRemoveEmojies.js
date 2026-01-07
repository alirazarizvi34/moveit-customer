import React from 'react';

export default useRemoveEmojies = () => {

  const removeEmojies = text => {
    const discription = text
      .replace(
        /([\u2700-\u27BF]|[\uF8FF]|\uD83C[\uDC00-\uDEEE]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        '',
      )
      .replace(/\s+/g, ' ')
      .trim();
    return discription;
  };

  return {removeEmojies};
};