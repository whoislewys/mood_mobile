import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { colors, dimensions, fonts } from '../../assets/styles';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '72.0%',
    height: dimensions.height * 0.2,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 10,
    shadowOpacity: 0.65,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  modalHeader: {
    height: '30%',
    justifyContent: 'flex-end',
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 4,
    width: '85.93%',
    height: '23.57%',
    marginVertical: '4%',
    textAlign: 'center',
    fontFamily: fonts.primaryLight,
    fontSize: fonts.body,
    color: colors.black,
  },
  modalButtonsRow: {
    height: '30%',
    flexDirection: 'row',
  },
  modalButtonLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderRightWidth: 0.25,
    borderTopWidth: 0.5,
  },
  modalButtonRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderLeftWidth: 0.25,
    borderTopWidth: 0.5,
  },
  modalText: {
    fontFamily: fonts.primaryBold,
    fontSize: fonts.subHeader,
    color: colors.black,
  },
  modalTextCancel: {
    fontFamily: fonts.primaryLight,
    fontSize: fonts.subHeader,
  },
});

const TwoButtonModal = props => (
  <Modal
    visible={props.visible}
    style={{ margin: 0 }}
    avoidKeyboard
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalText}>Create new playlist</Text>
        </View>
        <TextInput
          autoFocus
          blurOnSubmit
          onChangeText={text => props.onChangeText(text)}
          onSubmitEditing={props.confirm}
          placeholder='Enter playlist title'
          style={styles.modalInput}
          value={props.value}
        />
        <View style={styles.modalButtonsRow}>
          <TouchableOpacity onPress={props.cancel} style={styles.modalButtonLeft}>
            <Text style={[styles.modalText, styles.modalTextCancel]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.confirm} style={styles.modalButtonRight}>
            <Text style={styles.modalText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default TwoButtonModal;
