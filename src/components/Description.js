import React, { Component } from 'react';
import { Text } from 'react-native';

import styles from '../styles';

export default class Class extends Component {
  render() {
    return (
      <Text style={styles.description} >
        {this.props.text}
      </Text>
    );
  }
}