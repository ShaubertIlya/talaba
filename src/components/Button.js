import React, { Component } from 'react';
import { 
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const colors = {
  text: {
    default: '#515a6e',
    primary: '#fff',
    icon: '#515a6e'
  }
}

export default class Class extends Component {
  render() {
    let containerStyle = !this.props.circle ? 
    [styles.container] : [styles.circle];

    let textStyle = [styles.text];

    if(!!this.props.type) {
      containerStyle.push(styles[this.props.type + 'Container']);
      textStyle.push(styles[this.props.type + 'Text']);
    }
    if(this.props.loading && this.props.type === 'primary') {
      containerStyle.push(styles.loadingContainer);
    }

    const textColor = !this.props.type ? 
    colors.text.default : colors.text[this.props.type];

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={containerStyle}
        onPress={this.props.onClick}
        disabled={this.props.loading}
      >
        {
          this.props.loading &&
          <ActivityIndicator
            size="small"
            color={textColor}
            style={!this.props.circle && styles.activityIndicator}
            key="loadingIndicator"
          />
        }
        {
          (this.props.loading && !this.props.circle) &&
          <Text
            style={textStyle}
            key="loadingText"
          >
            {
              !!this.props.percentage ? 
              `${this.props.percentage}%`: 'Загрузка...'
            }
          </Text>
        }
        {
          (!this.props.loading && !!this.props.icon) &&
          <Ionicons 
            name={this.props.icon} 
            size={25} 
            color={textColor}
            style={!this.props.circle && styles.icon}
          />
        }
        {
          (!this.props.loading && !this.props.circle) &&
          <Text style={textStyle}>
            {this.props.text}
          </Text>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 6,

    borderRadius: 4,
    borderWidth: 1,

    borderColor: '#dcdee2',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    position: 'absolute',
    bottom: 12,
    right: 12,

    width: 55,
    height: 55,

    borderRadius: 50,

    alignItems: 'center',
    justifyContent: 'center',

    elevation: 3
  },
  text: {
    fontSize: 16,
    color: colors.text.default
  },
  primaryContainer: {
    borderColor: '#2d8cf0',
    backgroundColor: '#2d8cf0'
  },
  primaryText: {
    color: colors.text.primary
  },
  loadingContainer: {
    borderColor: '#78B3F5',
    backgroundColor: '#78B3F5'
  },
  iconContainer: {
    padding: 6,
    margin: 0,
    borderWidth: 0,
    borderColor: "#fff",
    backgroundColor: "#fff"
  },
  activityIndicator: {
    marginRight: 12
  },
  icon: {
    marginRight: 8
  }
});