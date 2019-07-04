import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const colors = {
  error: '#ed4014',
  success: '#2d8cf0'
}

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    if(this.props.onClose) this.props.onClose();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text 
          style={[
            styles.text, 
            {color: colors[this.props.type]}
          ]}
        >
          {this.props.text}
        </Text>

        {
          !!this.props.onClose &&
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={this.handleClose}
            style={styles.close}
          >
            <Ionicons
              name="md-close"
              size={20}
              color={colors[this.props.type]}
            />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14
  },
  close: {
    padding: 6
  }
});