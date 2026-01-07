import React, {useContext, useEffect} from 'react';
import MergnModule from '../../MergnModule';

export default useMergn = () => {

  const eventHandler = async (eventName,propertyName, propertyValue) => {
    const eventPropertiesMap = propertyName && propertyValue ? {[propertyName] : propertyValue} : {};
    const message = await MergnModule.performEvent(
      eventName,
      eventPropertiesMap,
    );
    return message;
  };

  const attributeHandler = async (attributeName, attributeValue) => {
    const attributeNamemessage = await MergnModule.setAttribute(
      attributeName,
      attributeValue,
    );
    return attributeNamemessage;
  };

  const uniqueIdentifierHandler = async uniqueIdentifier => {
    const uniqueIdentifiermessage = await MergnModule.login(uniqueIdentifier);
    return uniqueIdentifiermessage;
  };

  return {
    eventHandler,
    attributeHandler,
    uniqueIdentifierHandler,
  };
};
