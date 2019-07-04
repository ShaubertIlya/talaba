import React, { Component } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Alert as Dialog,
} from 'react-native';

import firebase from 'firebase';

import storage from '../../plugins/storage';
import fs from '../../plugins/fs';

import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Class extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: !!navigation.getParam('id') ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{padding: 16}}
          onPress={navigation.getParam('handleDelete')}
        >
          <Ionicons name="md-trash" size={24} color="#515a6e"/>
        </TouchableOpacity>
      ) : null,
    };
  };

  constructor(props) {
    super(props);

    this.handleName = this.handleName.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleAchievement = this.handleAchievement.bind(this);
    this.handleAchievementSubmit = this.handleAchievementSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleFilePick = this.handleFilePick.bind(this);
    this.handleFileDelete = this.handleFileDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {
    saving: false,
    percentage: null,
    id: this.props.navigation.getParam('id'),
    name: this.props.navigation.getParam('name'),
    achievement: this.props.navigation.getParam('achievement'),
    date: this.props.navigation.getParam('date'),
    file: this.props.navigation.getParam('files') && 
          this.props.navigation.getParam('files')[0]
  }

  componentDidMount() {
    this.props.navigation.setParams({ id: this.state.id });
    this.props.navigation.setParams({ handleDelete: this.handleDelete });
  }

  handleName(value) {
    this.setState({name: value});
  }

  handleNameSubmit() {
    this._achievement.focus();
  }

  handleAchievement(value) {
    this.setState({achievement: value});
  }

  handleAchievementSubmit() {
    this._date.focus();
  }

  handleDate(value) {
    this.setState({date: value});
  }

  async handleFilePick() {
    const picture = await fs.getPicture();

    this.setState({file: picture});
  }

  handleFileDelete() {
    this.setState({file: null});
  }

  async handleDelete() {
    Dialog.alert(
      "Удаление",
      'Вы уверены, что хотите удалить?',
      [
        { text: 'Отменить', style: 'cancel' },
        { text: 'OK', onPress: () => this.delete() },
      ],
      {cancelable: true},
    );
  }

  async delete() {
    const uid = firebase.auth().currentUser.uid;
    const path = `users/${uid}/achievements/${this.state.id}`;
    const ref = firebase.database().ref(path);

    await ref.remove();

    this.props.navigation.getParam('onDelete')({ 
      id: this.state.id
    });
    this.props.navigation.goBack();
  }

  // TODO STORAGE FILE NAME
  // TODO DELETE ACHIEVEMENT AT TOP BAR NAVIGATOR
  // TODO Права доступа на сервере
  // TODO Размер файла на сервере
  // TODO Download file
  // TODO File в отдельный компонент
  // TODO ARE YOU SURE WANT TO DELETE THIS FILE
  async handleSave() {
    if(!this.state.name) {
      this.setState({error: "Необходимо ввести наименование"});
      return;
    }
    else if(!this.state.achievement) {
      this.setState({error: "Необходимо ввести достижение"});
      return;
    }
    else if(!this.state.date) {
      this.setState({error: "Необходимо ввести дату"});
      return;
    }
    else if(!this.state.file) {
      this.setState({error: "Необходимо прикрепить документ для подтверждения"});
      return;
    }
    else if(this.state.file.size > storage.max) {
      this.setState({error: "Файл не должен превышать 50 мегабайт"});
      return;
    }
    else this.setState({saving: true, error: null});

    try {
      const uid = firebase.auth().currentUser.uid;

      const ref = !!this.state.id ?
      firebase.database().ref(`users/${uid}/achievements/${this.state.id}`) :
      firebase.database().ref(`users/${uid}/achievements`).push();

      const files = await storage.upload(
        [this.state.file],
        `users/${uid}/achievements/${ref.key}/`,
        percentage => this.setState({percentage})
      );

      const data = {
        name: this.state.name,
        achievement: this.state.achievement,
        date: this.state.date,
        files
      };

      await ref.update(data);

      this.props.navigation.getParam('onSave')({ 
        id: ref.key, ...data
      });
      this.props.navigation.goBack();
    }
    catch(e) {
      const error = "Ошибка при загрузке";

      this.setState({saving: false, error});
    }
  }

  render() {
    return (
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <Input
          autoFocus={!this.state.id}
          title="Наименование мероприятия"
          placeholder="Олимпиада по физике"
          value={this.state.name}
          onChange={this.handleName}
          returnKeyType="go"
          onSubmitEditing={this.handleNameSubmit}
        />
        <Input
          ref={(input) => this._achievement = input}
          title="Достижение"
          placeholder="1 место"
          value={this.state.achievement}
          onChange={this.handleAchievement}
          returnKeyType="go"
          onSubmitEditing={this.handleAchievementSubmit}
        />
        <Input
          ref={(input) => this._date = input}
          title="Дата"
          placeholder="Введите дату"
          value={this.state.date}
          onChange={this.handleDate}
          returnKeyType="done"
          onSubmitEditing={this.handleSave}
        />
        {
          !!this.state.file ?
          <Alert 
            text={this.state.file.name}
            type="success"
            onClose={this.handleFileDelete}
          /> :
          <Button
            text="Прикрепить документ"
            onClick={this.handleFilePick}
          />
        }
        {
          !!this.state.error &&
          <Alert text={this.state.error} type="error"/>
        }
        <Button 
          type="primary"
          text="Сохранить"
          percentage={this.state.percentage}
          loading={this.state.saving}
          onClick={this.handleSave}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 6
  },
  trash: {
    paddingLeft: 8
  }
});