import React, { Component } from 'react';
import { 
  ScrollView, 
  StyleSheet
} from 'react-native';

import Card from '../components/Card';
import Photos from '../components/Photos';

export default class Class extends Component {
  state = {
    name: this.props.navigation.getParam('name'),
    description: this.props.navigation.getParam('description'),
    avatar: this.props.navigation.getParam('avatar'),
    photos: this.props.navigation.getParam('photos')
  }

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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});