import React, { Component } from 'react';
import { ScrollView, StyleSheet} from 'react-native';

import firebase from 'firebase';

import Message from '../components/Message';

export default class Class extends Component {
  state = {
    institutionAvatar: this.props.navigation.getParam('institutionAvatar'),
    message: this.props.navigation.getParam('message'),
    status: this.props.navigation.getParam('status')
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Message
          avatar={this.state.institutionAvatar}
          text="Ваша заявка принята. Свяжемся с вами в ближайшее время."
        />
        {
          !!this.state.status &&
          <Message
            avatar={this.state.institutionAvatar}
            text={this.state.message}
            status={this.state.status}
          />
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 6,
    justifyContent: 'flex-end'
  }
});