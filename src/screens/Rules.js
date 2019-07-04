import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';

import Info from '../components/Info';

export default class Class extends Component {
  state = {
    rules: this.props.navigation.getParam('rules'),
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Info
          title="Правила приема"
          text={this.state.rules}
          disabled
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});