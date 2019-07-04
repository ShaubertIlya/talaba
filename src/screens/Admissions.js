import React, { Component } from 'react';
import { 
  ScrollView, 
  StyleSheet
} from 'react-native';

import firebase from 'firebase';

import Loading from "./Loading";
import Auth from './Auth';

import Card from '../components/Card';

// import specialties from '../test/specialties';

const initialState = {
  loading: true,
  user: null,
  admissions: []
}

// TODO NOTIFICATION
// TODO PREVENT RELOAD
export default class Class extends Component {
  static navigationOptions = () => {
    return {
      tabBarOnPress({ navigation, defaultHandler }) {
        navigation.state.params.onTabFocus();

        defaultHandler();
      }
    };
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleTabFocus = this.handleTabFocus.bind(this);

    props.navigation.setParams({
      onTabFocus: this.handleTabFocus
    });
  }

  state = {...initialState}

  componentDidMount() {
    return;
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        console.log(payload);

        this.setState({...initialState});

        firebase.auth().onAuthStateChanged(async user => {
          if(!!user) {
            // const admissions = [];

            const uid = firebase.auth().currentUser.uid;
            const ref = firebase.database().ref(`admissions/`)
            .orderByChild('uid').equalTo(uid);
            const snapshot = await ref.once('value');
            const array = [];

            snapshot.forEach(childSnapshot => {
              const value = childSnapshot.val();

              value.id = childSnapshot.key;

              const date = new Date(value.timestamp);
              const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентебря', 'Октября', 'Ноября', 'Декабря'];

              const dd = date.getDate();
              const mm = months[date.getMonth()];
              const yyyy = date.getFullYear();

              value.date = dd + ' ' + mm + ' ' + yyyy + ' года';

              array.push(value);
            });
    
            this.setState({loading: false, user, admissions: array});
          }
          else {
            this.setState({loading: false, user: null});
          }
        });
      }
    );
  }

  handleTabFocus() {
    this.setState({...initialState});

    firebase.auth().onAuthStateChanged(async user => {
      if(!!user) {
        // const admissions = [];

        const uid = firebase.auth().currentUser.uid;
        const ref = firebase.database().ref(`admissions/`)
        .orderByChild('uid').equalTo(uid);
        const snapshot = await ref.once('value');
        const array = [];

        snapshot.forEach(childSnapshot => {
          const value = childSnapshot.val();

          value.id = childSnapshot.key;

          const date = new Date(value.timestamp);
          const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентебря', 'Октября', 'Ноября', 'Декабря'];

          const dd = date.getDate();
          const mm = months[date.getMonth()];
          const yyyy = date.getFullYear();

          value.date = dd + ' ' + mm + ' ' + yyyy + ' года';

          array.push(value);
        });

        this.setState({loading: false, user, admissions: array});
      }
      else {
        this.setState({loading: false, user: null});
      }
    });
  }

  handleClick(element) {
    this.props.navigation.navigate('Admission', {
      ...element
    });
  }

  render() {
    if(this.state.loading) return <Loading/>;
    else if(this.state.user === null) return <Auth/>;

    const admissions = this.state.admissions.map(element => (
      <Card
        key={element.id}
        id={element.id}
        title={element.specialtyName}
        text={`${element.date}\n${element.institutionName}`}
        avatar={element.institutionAvatar}
        onClick={() => this.handleClick(element)}
      />
    ));

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {admissions}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});