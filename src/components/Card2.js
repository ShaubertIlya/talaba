import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import styles from '../styles';

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    if(this.props.onPress) this.props.onPress();
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.card}
        disabled={!this.props.onPress}
        onPress={this.handlePress}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}