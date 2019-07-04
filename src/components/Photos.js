import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

// TODO HANDLE CLICK PREVIEW
export default class Class extends Component {
  render() {
    const images = (this.props.photos || []).map((e, i) => (
      <Image
        key={'image' + i}
        style={styles.image}
        source={{uri: e.url}}
      />
    ));

    return (
      <ScrollView 
        horizontal
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
      >
        {images}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 6,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dcdee2'
  },
  contentContainerStyle: {
    padding: 8
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    margin: 4,
    backgroundColor: '#dcdee2'
  }
});
