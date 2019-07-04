import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import firebase from 'firebase';

import Button from '../components/Button';

class Class extends Component {
  constructor(props) {
    super(props);

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidMount() {
    if(this.props.navigation.getParam('goBack')) {
      this._unsubscribe = firebase.auth()
      .onAuthStateChanged(user => {
        if(!!user) this.props.navigation.goBack();
      });
    }
  }

  componentWillUnmount() {
    if(this._unsubscribe) this._unsubscribe();
  }
  
  handleSignIn() {
    this.props.navigation.navigate('SignIn');
  }

  handleSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          text="Войти"
          onClick={this.handleSignIn}
        />
        <Button 
          type="primary"
          text="Создать учетную запись"
          onClick={this.handleSignUp}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 6
  }
});

export default withNavigation(Class);