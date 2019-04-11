import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const PlaylistDetailScreen = props => (
  <View style={styles.container}>
    <Text>PLAYLIST DETAILS</Text>
    <TouchableOpacity style={{backgroundColor: 'red', height: 100, width: 100, alignSelf: 'center'}} onPress={() => props.navigation.goBack()} />
  </View>
);

export default PlaylistDetailScreen;
