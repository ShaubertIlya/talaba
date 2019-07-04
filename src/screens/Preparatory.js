import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';

import Info from '../components/Info';

export default class Class extends Component {
  state = {
    preparatory: this.props.navigation.getParam('preparatory'),
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Info
          title="Подготовительные курсы"
          text={this.state.preparatory}
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