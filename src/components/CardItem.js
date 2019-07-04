import React, { Component } from 'react';

import Card from './Card';
import Title from './Title';
import Description from "./Description";

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
      <Card onPress={this.handlePress}>
        <Title text={this.props.title}/>
        <Description text={this.props.description}/>
      </Card>
    );
  }
}