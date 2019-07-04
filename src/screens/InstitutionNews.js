import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';

import firebase from 'firebase';

import Loading from "./Loading";

import Info from '../components/Info';

const initialState = {
  loading: true,
  news: []
}

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  state = {...initialState}

  async componentDidMount() {
    const id = this.props.navigation.getParam('id');
    const ref = firebase.database().ref(`news/${id}`);
    const snapshot = await ref.once('value');
    const array = [];

    snapshot.forEach(childSnapshot => {
      const element = childSnapshot.val();
      element.id = childSnapshot.key;
      array.push(element);
    });

    this.setState({loading: false, news: array});
  }

  handleClick(id) {
    const element = this.state.news.find(e => e.id === id);

    this.props.navigation.navigate('News', {
      ...element,
      avatar: this.props.navigation.getParam('avatar')
    });
  }

  render() {
    if(this.state.loading) return <Loading/>;

    const news = this.state.news.map((element, i) => (
      <Info
        key={element.id}
        id={element.id}
        title={element.name}
        text={element.description}
        onClick={this.handleClick}
      />
    ));

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {news}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});