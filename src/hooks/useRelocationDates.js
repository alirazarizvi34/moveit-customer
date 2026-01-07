import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import moment from 'moment';

const useRelocationDates = () => {
  let currentNewDate = moment(new Date()).format('YYYY-MM-DD');

  const {bootMeUpData} = useContext(GlobalContext);
  const [timeSlots, setTimeSlots] = useState([]);
  const [showTimeSlotModal, setTimeSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState(currentNewDate);
  const [selectedDay, setSelectedDay] = useState('');
  const [timeZone, setTimeZone] = useState(null);

  useEffect(() => {
    const moment = require('moment');
    const getDate = new Date();
    const offset = moment(getDate).format('Z').replace(':', '');
    setTimeZone(offset);
  }, [timeZone]);

  const onDatePickHandler = (
    date,
    currentType = 'move',
    currentRequestType = 'move',
  ) => {
    try {
      setDate(date);

      const todayFormmatedDay = moment(new Date()).format('YYYY-MM-DD');

      setSelectedSlot(null);
      setTimeSlotModal(true);

      const moveTimeSlots = bootMeUpData?.move_time_slots[selectedDay];
      const surveyTimeSlots = bootMeUpData?.survey_time_slots[selectedDay];
      const moveSlots = generateTimeSlots(
        moveTimeSlots?.from['24h'],
        moveTimeSlots?.to['24h'],
        1,
      );

      const surveySlots = generateTimeSlots(
        surveyTimeSlots?.from['24h'],
        surveyTimeSlots?.to['24h'],
        1,
      );

      const currentTime = moment();

      const surveyThreshold =
        parseInt(bootMeUpData?.survey_threshold ?? 0) / 60;
      // Calculate the time after 5 hours using moment
      const timeAfter5Hours = moment(currentTime).add(
        surveyThreshold ?? 0,
        'hours',
      );
      
      // Filter the array based on the condition
      const filteredTimeSlots = surveySlots.filter(slot => {
        const startTime = moment(
          `${todayFormmatedDay}T${slot.startTime}`,
          'YYYY-MM-DDTHH:mm:ss',
        );
        return startTime.isAfter(timeAfter5Hours);
      });

      if (currentType == 'move') {
        if (currentRequestType == 'survey') {
          if (todayFormmatedDay == date) {
            setTimeSlots(filteredTimeSlots);
          } else {
            setTimeSlots(surveySlots);
          }
        } else {
          setTimeSlots(moveSlots);
        }
      } else {
        if (todayFormmatedDay == date) {
          setTimeSlots(filteredTimeSlots);
        } else {
          setTimeSlots(surveySlots);
        }
      }
    } catch (err) {
      // console.log('this is err=======', err);
    }
  };

  const generateTimeSlots = (startTime, endTime, hoursDifference) => {
    const timeSlots = [];
    if (startTime && endTime && hoursDifference) {
      const [startHour, startMinute] = startTime.split(':');
      const start = new Date(0, 0, 0, startHour, startMinute);
      const [endHour, endMinute] = endTime.split(':');
      const end = new Date(0, 0, 0, endHour, endMinute);

      while (start < end) {
        const slotEnd = new Date(
          start.getTime() + hoursDifference * 60 * 60 * 1000,
        );
        let selected = false;

        timeSlots.push({
          startTime: start.toTimeString().slice(0, 8),
          endTime: slotEnd.toTimeString().slice(0, 8),
          selected: selected,
        });

        start.setTime(slotEnd.getTime());
      }

      // Add the last slot with endTime based on the hoursDifference
      const lastSlotEndTime = new Date(
        start.getTime() + hoursDifference * 60 * 60 * 1000,
      );
      timeSlots.push({
        startTime: start.toTimeString().slice(0, 8),
        endTime: lastSlotEndTime.toTimeString().slice(0, 8),
        selected:
          selectedSlot?.startTime == start.toTimeString().slice(0, 8) &&
          selectedSlot?.endTime == lastSlotEndTime.toTimeString().slice(0, 8),
      });

      return timeSlots;
    } else {
      return [];
    }
  };
  const onSlotPickHandler = slot => {
    setSelectedSlot(slot);

    const moveSlots = timeSlots.map(slot => {
      return {...slot, selected: false};
    });
    const currentSlotIndex = moveSlots.findIndex(
      currentSlot =>
        currentSlot.startTime == slot.startTime &&
        currentSlot.endTime == slot.endTime,
    );

    if (currentSlotIndex !== -1) {
      moveSlots[currentSlotIndex] = {
        ...moveSlots[currentSlotIndex],
        selected: true,
      };
    }

    setTimeSlots([...moveSlots]);
  };
  return {
    showTimeSlotModal,
    timeSlots,
    timeZone,
    setTimeSlotModal,
    selectedSlot,
    onDatePickHandler,
    date,
    setDate,
    setSelectedDay,
    onSlotPickHandler,
  };
};

export default useRelocationDates;
