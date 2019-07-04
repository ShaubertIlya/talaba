import React, { Component } from 'react';
import { 
  ScrollView,
  StyleSheet,
  View,
  Keyboard
} from 'react-native';

import firebase from 'firebase';

import Loading from "./Loading";

import Card from '../components/Card';
import Input from '../components/Input';

const initialState = {
  loading: true,
  institutions: [],
  elements: []
}

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }

  state = {...initialState}

  // TODO FIRST 20 LAZY LOAD
  async componentDidMount() {
    const ref = firebase.database().ref('institutions').orderByChild('active').equalTo(true);
    const snapshot = await ref.once('value');
    const array = [];
    
    snapshot.forEach(childSnapshot => {
      const element = childSnapshot.val();
      element.id = childSnapshot.key;

      if(!!element.avatar) {
        array.push(element);
      }
    });

    this.setState({
      loading: false,
      institutions: array,
      elements: array
    });
  }

  handleClick(id) {
    const institution = !id ? null : this.state.institutions.find(
      e => e.id === id
    );

    this.props.navigation.navigate('Institution', {
      ...institution
    });
  }

  handleSearch(value) {
    const target = value.toLowerCase();

    const elements = this.state.institutions.filter(e => {
      const name = e.name.toLowerCase();

      return (name.startsWith(target));
    });

    this.setState({elements});
  }

  handleSubmitSearch() {
    Keyboard.dismiss();
  }

  render() {
    if(this.state.loading) return <Loading/>;

    const institutions = this.state.elements.map(element => (
      <Card
        key={element.id}
        id={element.id}
        title={element.name}
        text={element.description}
        avatar={element.avatar}
        onClick={this.handleClick}
      />
    ));

    return (
      <View style={styles.root}>
        <View style={styles.searchContainer}>
          <Input
            placeholder="Поиск"
            onChange={this.handleSearch}
            onSubmitEditing={this.handleSubmitSearch}
          />
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          {institutions}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  searchContainer: {
    padding: 6,
    paddingBottom: 0
  },
  container: {
    padding: 6,
    paddingTop: 0
  }
});