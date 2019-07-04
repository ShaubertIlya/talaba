import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.props.onClick) this.props.onClick(this.props.id)
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={this.handleClick}
        disabled={this.props.disabled}
      >
        <View style={styles.head}>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
          <Text style={styles.special}>
            {this.props.special}
          </Text>
        </View>
        {
          !!this.props.text &&
          <Text 
            style={styles.text} 
            numberOfLines={this.props.numberOfLines}
          >
            {this.props.text}
          </Text>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    padding: 16,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dcdee2'
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    flex: 1,
    flexWrap: "wrap",

    fontSize: 16,
    fontWeight: 'bold',
    color: '#464c5b'
  },
  text: {
    fontSize: 16,
    color: '#515a6e'
  },
  special: {
    marginLeft: 8,
    fontSize: 16,
    color: '#9ea7b4'
  }
});