import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../components/Button';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.navigation.navigate('Initial');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.center}>
          <Ionicons 
            name="md-checkmark"
            size={50} 
            color="#19be6b"
          />
          <Text style={styles.text}>
            Спасибо! Ваша заявка принята и будет обработана в ближайшее время
          </Text>
        </View>
        <Button 
          type="primary"
          text="Вернуться"
          onClick={this.handleBack}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 6,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#515a6e',
    fontSize: 20,
    textAlign: 'center'
  }
});