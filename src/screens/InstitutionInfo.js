import React, { Component } from 'react';
import { 
  ScrollView, 
  StyleSheet
} from 'react-native';

import firebase from 'firebase';

import Card from '../components/Card';
import Photos from '../components/Photos';
import Info from '../components/Info';

export default class Class extends Component {
  state = {
    name: this.props.navigation.getParam('name'),
    description: this.props.navigation.getParam('description'),
    avatar: this.props.navigation.getParam('avatar'),
    photos: this.props.navigation.getParam('photos'),
    address: this.props.navigation.getParam('address'),
    email: this.props.navigation.getParam('email'),
    phone: this.props.navigation.getParam('phone')
  }

  //TODO DISABLE CARD TOUCH
  //TODO COPY INFO
  //TODO DONT SHOW EMPTY INSTITUTION THAT JUST CREATED, BECAUSE OF NO INFORMATION TYPED?
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card
          title={this.state.name}
          text={this.state.description}
          avatar={this.state.avatar}
          disabled
        />
        <Photos photos={this.state.photos}/>
        <Info
          title="Адрес"
          text={this.state.address}
          disabled
        />
        <Info
          title="Email"
          text={this.state.email}
          disabled
        />
        <Info
          title="Телефон"
          text={this.state.phone}
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