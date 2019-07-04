import React, { Component } from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Alert as Dialog,
  Keyboard,
  Text
} from 'react-native';

import firebase from 'firebase';

import Loading from "./Loading";
import Auth from './Auth';

import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';

const initialState = {
  loading: true,
  user: null,

  surname: null,
  name: null,
  birthdate: null,

  changed: false,
  saving: false,
  success: false
}

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleSurname = this.handleSurname.bind(this);
    this.handleSurnameSubmit = this.handleSurnameSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleBirthdate = this.handleBirthdate.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  state = {...initialState}

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if(!!user) {
        this.setState({...initialState});

        const uid = firebase.auth().currentUser.uid;
        const ref = firebase.database().ref(`/users/${uid}/data`);
        const snapshot = await ref.once('value');
        const data = snapshot.val();

        this.setState({loading: false, user, ...data});
      }
      else {
        this.setState({loading: false, user: null});
      }
    });
  }

  handleSurname(value) {
    this.setState({surname: value, changed: true});
  }

  handleSurnameSubmit() {
    this._name.focus();
  }

  handleName(value) {
    this.setState({name: value, changed: true});
  }

  handleNameSubmit() {
    this._birthdate.focus();
  }

  handleBirthdate(value) {
    this.setState({birthdate: value, changed: true});
  }

  handleFocus() {
    this._surname.focus();
  }

  async handleSaveClick() {
    if(this.state.changed) {
      this.setState({saving: true});

      const uid = firebase.auth().currentUser.uid;
      const ref = firebase.database().ref('users/' + uid + '/data');

      await ref.update({
        surname: this.state.surname,
        name: this.state.name,
        birthdate: this.state.birthdate
      });

      this.setState({
        saving: false,
        success: true,
        changed: false
      });
    }

    Keyboard.dismiss();
  }

  async handleSignOutClick() {
    Dialog.alert(
      "Выход",
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отменить', style: 'cancel' },
        { text: 'OK', onPress: () => this.signOut() },
      ],
      {cancelable: true},
    );
  }

  async signOut() {
    firebase.auth().signOut();
  }

  render() {
    if(this.state.loading) return <Loading/>;
    else if(this.state.user === null) return <Auth/>;
    
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.head}>
            <Text style={styles.email}>
              {this.state.user.email}
            </Text>
            <Button
              type="icon"
              text="Выйти"
              onClick={this.handleSignOutClick}
            />
          </View>
          <Input
            ref={(input) => this._surname = input}
            title="Фамилия"
            placeholder="Введите фамилию"
            value={this.state.surname}
            onChange={this.handleSurname}
            returnKeyType="go"
            onSubmitEditing={this.handleSurnameSubmit}
          />
          <Input
            ref={(input) => this._name = input}
            title="Имя"
            placeholder="Введите имя"
            value={this.state.name}
            onChange={this.handleName}
            returnKeyType="go"
            onSubmitEditing={this.handleNameSubmit}
          />
          <Input
            ref={(input) => this._birthdate = input}
            title="Дата рождения"
            placeholder="Введите дату рождения"
            value={this.state.birthdate}
            onChange={this.handleBirthdate}
            returnKeyType="done"
            onSubmitEditing={this.handleSaveClick}
          />
          {
            (this.state.success && !this.state.changed) &&
            <Alert type="success" text="Успешно сохранено"/>
          }
          {       
            this.state.changed &&
            <Button
              loading={this.state.saving}
              type="primary"
              text="Сохранить"
              onClick={this.handleSaveClick}
            />
          }
        </ScrollView>
        {
          !this.state.focused && 
          <Button
            circle
            type="primary"
            icon="md-create"
            onClick={this.handleFocus}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    padding: 6,
    paddingBottom: 73
  },
  head: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  email: {
    marginTop: 6,
    marginRight: 6,
    color: '#9ea7b4'
  }
});