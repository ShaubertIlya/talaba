import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import firebase from 'firebase';

import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';

//TODO BIND
export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
  }

  state = {
    email: null,
    password: null,
    loading: false,
    error: null
  }

  handleEmailSubmit() {
    this._password.focus();
  }

  async handleSignIn() {
    if(!this.state.email) {
      this.setState({error: "Необходимо ввести email"});
      return;
    }
    else if(!this.state.password) {
      this.setState({error: "Необходимо ввести пароль"});
      return;
    }
    else this.setState({loading: true, error: null});

    try {
      await firebase.auth().signInWithEmailAndPassword(
        this.state.email,
        this.state.password
      );

      this.props.navigation.goBack();
    }
    catch(error) {
      this.setState({
        loading: false,
        error: "Неверный логин или пароль"
      });
    }
  }

  render() {
    return (
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <Input
          autoFocus
          title="Email"
          placeholder="Введите email"
          value={this.state.email}
          onChange={value => this.setState({email: value})}
          returnKeyType="go"
          keyboardType="email-address"
          onSubmitEditing={this.handleEmailSubmit}
        />
        <Input
          ref={(input) => this._password = input}
          title="Пароль"
          placeholder="Введите пароль"
          value={this.state.password}
          onChange={value => this.setState({password: value})}
          secure
          returnKeyType="done"
          onSubmitEditing={this.handleSignIn}
        />
        {
          !!this.state.error &&
          <Alert text={this.state.error} type="error"/>
        }
        <Button
          type="primary"
          text="Войти"
          loading={this.state.loading}
          onClick={this.handleSignIn}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // justifyContent: 'flex-end',
    padding: 6
  }
});