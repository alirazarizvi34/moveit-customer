import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text, ScrollView} from 'react-native';

export default function ListModal({
  modalVisible = false,
  onClose = () => {},
  data = [],
  onPress = () => {},
}) {
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
          <ScrollView>
            {data?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => onPress(item)}
                  style={{padding: 15}}>
                  <Text>{item?.name}</Text>
                </TouchableOpacity>
              );
            })}
            </ScrollView>
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
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
