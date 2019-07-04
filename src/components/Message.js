import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class Class extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Image
          style={styles.avatar}
          source={{
            uri: this.props.avatar[0] && this.props.avatar[0].url
          }}
        />
        {/* <View style={styles.container}>
          <View style={styles.message}>
            <Text style={styles.text}>
              {this.props.text}
            </Text>
          </View>
          {
            !!this.props.status &&
            <View style={styles[this.props.status]}/>
          }
        </View> */}

        <View style={[
          styles.message,
          this.props.status && styles[this.props.status]
        ]}>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    margin: 16,

    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    backgroundColor: '#dcdee2'
  },
  message: {
    flex: 1,
    padding: 16,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dcdee2'
  },
  text: {
    fontSize: 16,
    color: '#515a6e'
  },
  success: {
    // width: 10,
    // height: 10,
    // borderRadius: 5,
    // marginLeft: 16,
    borderColor: '#19be6b'
  },
  error: {
    // width: 10,
    // height: 10,
    // borderRadius: 5,
    // marginLeft: 16,
    borderColor: '#ed4014'
  }
});