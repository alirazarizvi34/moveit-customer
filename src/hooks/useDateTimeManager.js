import React, {useContext, useState} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import moment from 'moment';

export default useDateTimeManager = () => {
  const {bootMeUpData} = useContext(GlobalContext);
  const [isScheduledCancel, setIsScheduledCancel] = useState(false);
  const [scheduleDateLocal, setScheduleDateLocal] = useState(false);
  
  const convertToLocal = (utcDate, dateType='default') => {
    if(dateType == 'ordinal_suffix'){
      return moment.utc(utcDate).local().format('Do MMM, YY [at] h:mm A'); 
    }else if(dateType == 'default_with_day'){
      return moment.utc(utcDate).local().format('dddd / MMM DD, YYYY [at] h:mm A');
    }else{
      return moment.utc(utcDate).local().format('MMM DD, YYYY / hh:mm A');
    }
  };

  const timeDifferenceWithCurrentTime = (date, time , dateType='default') => {
    const dateTimeStr = `${date} ${time}`;
    const localdate = moment.utc(dateTimeStr).local();
    setScheduleDateLocal(convertToLocal(dateTimeStr,dateType));
    const currentMoment = moment();
    const differenceInHourse = localdate.diff(currentMoment, 'hours');
    if (
      differenceInHourse >=
      bootMeUpData?.small_moves_scheduled_cancel_threshold_in_hours
    ) {
      setIsScheduledCancel(true);
    } else {
      setIsScheduledCancel(false);
    }
  };

  return {
    timeDifferenceWithCurrentTime,
    convertToLocal,
    isScheduledCancel,
    scheduleDateLocal,
  };
};
