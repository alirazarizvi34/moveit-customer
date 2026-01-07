import React, {useState, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

export default function CalandarComponent({
  modalVisible = false,
  onClose = () => {},
  onPress = () => {},
  onDaySelect = () => {},
  ...props
}) {
  const initDate = new Date();
  const [selected, setSelected] = useState(initDate);
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: 'orange',
        selectedTextColor: 'purple',
      },
    }),
    [selected],
  );
  return (
    <View style={Styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onClose}>
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={1}
          style={[Styles.centeredView, {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
          <View style={Styles.modalView}>
            <Calendar
              // minDate={new Date()}
              disableAllTouchEventsForDisabledDays={true}
              markedDates={marked}
              onDayPress={day => {
                setSelected(day.dateString);
                onDaySelect(day);
              }}
              {...props}
              theme={{
                selectedDayTextColor: '#ffffff',
                todayTextColor: 'orange',
                dayTextColor: 'purple',
                arrowColor: 'orange',
                monthTextColor: 'orange',
                indicatorColor: 'blue',
                textMonthFontWeight: 'bold',
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: moderateScale(5),
    padding: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedDateStyle: {
    color: '#fff',
    backgroundColor: 'orange',
    padding: moderateScale(3),
    borderRadius: moderateScale(5),
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(30),
    height: scale(30),
    fontSize: scale(16),
  },
});
