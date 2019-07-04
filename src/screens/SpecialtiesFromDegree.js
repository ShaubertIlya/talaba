import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';

import Info from '../components/Info';

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    specialties: this.props.navigation.getParam('specialties')
  }

  handleClick(id) {
    const element = this.state.specialties.find(e => e.id === id);

    this.props.navigation.navigate('Specialty', {
      avatar: this.props.navigation.getParam('avatar'),
      institution: this.props.navigation.getParam('institution'),
      institutionName: this.props.navigation.getParam('institutionName'),
      institutionAvatar: this.props.navigation.getParam('institutionAvatar'),
      ...element
    });
  }

  render() {
    const specialties = this.state.specialties.map(element => (
      <Info
        key={element.id}
        id={element.id}
        title={element.name}
        text={`Срок обучения ${element.duration}`}
        special={element.code}
        onClick={this.handleClick}
      />
    ));

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {specialties}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});