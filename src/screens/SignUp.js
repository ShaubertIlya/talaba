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

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSurnameSubmit = this.handleSurnameSubmit.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
  }

  state = {
    surname: null,
    name: null,
    email: null,
    password: null,
    confirm: null,
    loading: false,
    error: false
  }

  handleSurnameSubmit() {
    this._name.focus();
  }

  handleNameSubmit() {
    this._email.focus();
  }

  handleEmailSubmit() {
    this._password.focus();
  }

  handlePasswordSubmit() {
    this._confirm.focus();
  }

  async handleSignUp() {
    if(!this.state.surname) {
      this.setState({error: "Необходимо ввести фамилию"});
      return;
    }
    if(!this.state.name) {
      this.setState({error: "Необходимо ввести имя"});
      return;
    }
    if(!this.state.email) {
      this.setState({error: "Необходимо ввести email"});
      return;
    }
    else if(!this.state.password) {
      this.setState({error: "Необходимо ввести пароль"});
      return;
    }
    else if(!this.state.confirm) {
      this.setState({error: "Необходимо подтвердить пароль"});
      return;
    }
    else if(this.state.password !== this.state.confirm) {
      this.setState({error: "Введенные пароли не совпадают"});
      return;
    }
    else this.setState({loading: true, error: null});

    try {
      const crendential = await firebase.auth()
      .createUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      );

      const uid = crendential.user.uid;
      const ref = firebase.database().ref('users/' + uid + '/data');

      await ref.update({
        surname: this.state.surname,
        name: this.state.name
      });
      
      this.props.navigation.goBack();
    }
    catch(e) {
      let error = "Неправильно заполнены данные";

      switch(e.code) {
        case "auth/email-already-in-use":
        error = "Пользователь с таким email уже зарегистрирован"
        break;
        case "auth/weak-password":
        error = "Пароль должен состоять минимум из 6 символов"
        break;
      }

      this.setState({loading: false, error});
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
          title="Фамилия"
          placeholder="Введите фамилию"
          value={this.state.surname}
          onChange={value => this.setState({surname: value})}
          returnKeyType="go"
          onSubmitEditing={this.handleSurnameSubmit}
        />
        <Input
          ref={(input) => this._name = input}
          title="Имя"
          placeholder="Введите имя"
          value={this.state.name}
          onChange={value => this.setState({name: value})}
          returnKeyType="go"
          onSubmitEditing={this.handleNameSubmit}
        />
        <Input
          ref={(input) => this._email = input}
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
          returnKeyType="go"
          onSubmitEditing={this.handlePasswordSubmit}
        />
        <Input
          ref={(input) => this._confirm = input}
          title="Подтверждение пароля"
          placeholder="Введите пароль еще раз"
          value={this.state.confirm}
          onChange={value => this.setState({confirm: value})}
          secure
          returnKeyType="done"
          onSubmitEditing={this.handleSignUp}
        />
        {
          !!this.state.error &&
          <Alert text={this.state.error} type="error"/>
        }
        <Button 
          type="primary"
          text="Создать учетную запись"
          loading={this.state.loading}
          onClick={this.handleSignUp}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 6
  }
});