import React, { Component } from 'react';
import { Image } from 'react-native';

import styles from '../styles';

export default class Class extends Component {
  render() {
    return (
      <Image
        style={styles.avatar}
        source={{uri: this.props.avatar}}
      />
    );
  }
}