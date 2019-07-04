import React, { Component } from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
} from 'react-native';

import firebase from 'firebase';

import Loading from "./Loading";
import Auth from './Auth';

import Button from '../components/Button';
import Info from '../components/Info';

const initialState = {
  loading: true,
  user: null,
  achievements: []
}

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {...initialState}

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if(!!user) {
        this.setState({...initialState});

        const uid = firebase.auth().currentUser.uid;
        const ref = firebase.database().ref(`/users/${uid}/achievements`);
        const snapshot = await ref.once('value');
        const array = [];
        
        snapshot.forEach(childSnapshot => {
          const element = childSnapshot.val();
          element.id = childSnapshot.key;
          array.push(element);
        });

        this.setState({loading: false, user, achievements: array});
      }
      else {
        this.setState({loading: false, user: null});
      }
    });
  }

  handleEdit(id) {
    const achievement = !id ? null : this.state.achievements.find(
      e => e.id === id
    );

    this.props.navigation.navigate('AchievementEdit', {
      ...achievement,
      onSave: this.handleSave,
      onDelete: this.handleDelete
    });
  }

  handleSave(data) {
    const index = this.state.achievements.findIndex(e => 
      (e.id === data.id)
    );

    if(index === -1) {
      this.setState(prevState => ({
        achievements: [...prevState.achievements, data]
      }));
    }
    else {
      this.setState(prevState => {
        const achievements = [...prevState.achievements];
        achievements[index] = data;
        return ({achievements});
      });
    }
  }

  handleDelete(id) {
    this.setState(prevState => {
      const achievements = [...prevState.achievements];
      const index = achievements.findIndex(e => e.id === id);

      achievements.splice(index, 1);

      return ({achievements});
    });
  }

  render() {
    if(this.state.loading) return <Loading/>;
    else if(this.state.user === null) return <Auth/>;

    const achievements = this.state.achievements.map(element => (
      <Info
        key={element.id}
        id={element.id}
        title={element.name}
        text={element.achievement}
        special={element.date}
        onClick={this.handleEdit}
      />
    ));
    
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="always"
        >
          {achievements}
        </ScrollView>
        <Button
          circle
          type="primary"
          icon="md-add"
          onClick={this.handleEdit}
        />
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
  }
});