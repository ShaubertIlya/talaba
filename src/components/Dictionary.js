import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class Class extends Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={this.props.onClick}
        disabled={!this.props.onClick}
      >
        <Text style={styles.title}>
          {this.props.title}
        </Text>
        <Text style={styles.value}>
          {this.props.value}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgb(230, 230, 230)'
  },
  title: {
    fontSize: 16,
    color: 'rgb(0, 0, 0)'
  },
  value: {
    fontSize: 16,
    color: 'rgb(128, 128, 128)'
  }
});