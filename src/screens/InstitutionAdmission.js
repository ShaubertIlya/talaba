import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';

import firebase from 'firebase';

import Info from '../components/Info';

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleSpecialtiesClick = this.handleSpecialtiesClick.bind(this);
    this.handlePreparatoryClick = this.handlePreparatoryClick.bind(this);
    this.handleRulesClick = this.handleRulesClick.bind(this);
  }

  state = {
    rules: this.props.navigation.getParam('rules'),
    preparatory: this.props.navigation.getParam('preparatory')
  }

  handlePreparatoryClick() {
    this.props.navigation.navigate('Preparatory', {
      preparatory: this.state.preparatory
    });
  }

  handleSpecialtiesClick() {
    this.props.navigation.navigate('Specialties', {
      avatar: this.props.navigation.getParam('avatar'),
      institution: this.props.navigation.getParam('id'),
      institutionName: this.props.navigation.getParam('name'),
      institutionAvatar: this.props.navigation.getParam('avatar')
    });
  }

  handleRulesClick() {
    this.props.navigation.navigate('Rules', {
      rules: this.state.rules
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          !!this.state.preparatory &&
          <Info
            title="Подготовительные курсы"
            numberOfLines={3}
            text={this.state.preparatory}
            onClick={this.handlePreparatoryClick}
          />
        }
        <Info
          title="Специальности"
          text="Поступление в колледж — шаг с которым связано профессиональное становление молодого человека и будущего специалиста"
          onClick={this.handleSpecialtiesClick}
        />
        {
          !!this.state.rules &&
          <Info
            title="Правила приема"
            numberOfLines={3}
            text={this.state.rules}
            onClick={this.handleRulesClick}
          />
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});