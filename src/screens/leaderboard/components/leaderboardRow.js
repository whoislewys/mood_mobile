import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const LeaderboardRow = ({ leaderboardSong }) => {
  return (
    <Text>{leaderboardSong.id}</Text>
  );
};

export default LeaderboardRow;
