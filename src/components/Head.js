import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class Class extends Component {
  render() {
    return (
      <Text style={styles.head}>
        {this.props.text}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(0, 0, 0)',
    margin: 8
  }
});