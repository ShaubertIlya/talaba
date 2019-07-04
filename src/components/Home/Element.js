import React, { Component } from 'react';
import { View } from 'react-native';

import styles from '../../styles';

import Card from '../Card';
import Avatar from '../Avatar';
import Title from '../Title';
import Description from "../Description";

export default class Class extends Component {
  render() {
    return (
      <Card>
        <View style={styles.row}>
          <Avatar avatar={this.props.avatar}/>
          <Title text={this.props.title}/>
        </View>
        <Description text={this.props.description}/>
      </Card>
    );
  }
}