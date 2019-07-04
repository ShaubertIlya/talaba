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
  specialties: []
}

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleDegreeClick = this.handleDegreeClick.bind(this);
  }

  state = {...initialState}

  async componentDidMount() {
    const id = this.props.navigation.getParam('institution');
    const ref = firebase.database().ref(`specialties/${id}`);
    const snapshot = await ref.once('value');
    const array = [];

    const degrees = new Map();
    
    snapshot.forEach(childSnapshot => {
      const element = childSnapshot.val();

      element.id = childSnapshot.key;

      if(!!element.degree) {
        if(!degrees.has(element.degree)) {
          degrees.set(element.degree, []);
        }

        const degree = degrees.get(element.degree);
        degree.push(element);
      }

      array.push(element);
    });

    this.setState({loading: false, specialties: array, degrees});
  }

  handleClick(id) {
    const element = this.state.specialties.find(e => e.id === id);

    this.props.navigation.navigate('Specialty', {
      avatar: this.props.navigation.getParam('avatar'),
      institution: this.props.navigation.getParam('institution'),
      institutionName: this.props.navigation.getParam('institutionName'),
      institutionAvatar: this.props.navigation.getParam('institutionAvatar'),
      ...element
    });
  }

  handleDegreeClick(degree) {
    const specialties = this.state.degrees.get(degree);

    this.props.navigation.navigate('SpecialtiesFromDegree', {
      avatar: this.props.navigation.getParam('avatar'),
      institution: this.props.navigation.getParam('institution'),
      institutionName: this.props.navigation.getParam('institutionName'),
      institutionAvatar: this.props.navigation.getParam('institutionAvatar'),
      specialties
    });
  }

  render() {
    if(this.state.loading) return <Loading/>;

    const degrees = [];

    this.state.degrees.forEach((value, key) => {
      degrees.push(
        <Info
          key={key}
          id={key}
          title={key}
          onClick={this.handleDegreeClick}
        />
      );
    });

    const specialties = (degrees.length === 0) ?
    this.state.specialties.map((element, i) => (
      <Info
        key={element.id}
        id={element.id}
        title={element.name}
        text={`Срок обучения ${element.duration}`}
        special={element.code}
        onClick={this.handleClick}
      />
    )) : null;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {degrees}
        {specialties}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});