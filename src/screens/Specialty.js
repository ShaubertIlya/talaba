import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import firebase from 'firebase';

import storage from '../../plugins/storage';

import Card from '../components/Card';
import Info from '../components/Info';
import Button from '../components/Button';
import Alert from '../components/Alert';

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  state = {
    saving: false,
    percentage: null,
    avatar: this.props.navigation.getParam('avatar'),
    institution: this.props.navigation.getParam('institution'),
    institutionName: this.props.navigation.getParam('institutionName'),
    institutionAvatar: this.props.navigation.getParam('institutionAvatar'),
    id: this.props.navigation.getParam('id'),
    documents: this.props.navigation.getParam('documents'),
    name: this.props.navigation.getParam('name'),
    description: this.props.navigation.getParam('description'),
    duration: this.props.navigation.getParam('duration'),
    grants: this.props.navigation.getParam('grants'),
    price: this.props.navigation.getParam('price')
  }

  handleDocumentPick(index) {
    const options = {
      title: 'Прикрепление',
      takePhotoButtonTitle: "Сделать снимок",
      chooseFromLibraryButtonTitle: "Выбрать из галереи",
      cancelButtonTitle: 'Отменить',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {}
      else if (response.error) {}
      else if (response.customButton) {}
      else {
        this.setState(prevState => {
          const documents = [...prevState.documents];

          documents[index].name = response.fileName;
          documents[index].size = response.fileSize;
          documents[index].type = response.type;
          documents[index].uri = response.uri;

          return {documents};
        });
      }
    });
  }

  handleDocumentDelete(index) {
    this.setState(prevState => {
      const documents = [...prevState.documents];

      delete documents[index].name;
      delete documents[index].size;
      delete documents[index].type;
      delete documents[index].uri;

      return {documents};
    });
  }

  async handleSave() {
    const user = firebase.auth().currentUser;

    if(!user) {
      this.props.navigation.navigate('Auth', { goBack: true });
      return;
    }

    for (let i = 0; i < this.state.documents.length; i++) {
      const document = this.state.documents[i];
      
      if(!document.uri) {
        this.setState({error: "Необходимо прикрепить " + document.title});
        return;
      }
      else if(document.size > storage.max) {
        this.setState({error: document.title + "  превышает 50 мегабайт"});
        return;
      }
    }

    this.setState({saving: true, error: null});

    try {
      const ref = firebase.database().ref(`admissions`).push();

      const files = await storage.upload(
        this.state.documents,
        `admissions/${ref.key}/`,
        percentage => this.setState({percentage})
      );

      const data = {
        uid: user.uid,
        specialty: this.state.id,
        institution: this.state.institution,
        specialtyName: this.state.name,
        institutionName: this.state.institutionName,
        institutionAvatar: this.state.institutionAvatar,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        files: files.map((e, i) => ({
          title: this.state.documents[i].title, ...e
        }))
      };

      await ref.update(data);

      this.props.navigation.navigate('AdmissionSuccess');
    }
    catch(e) {
      const error = "Ошибка при загрузке";

      this.setState({saving: false, error});
    }
  }

  //TODO COPY INFO
  render() {
    const documents = this.state.documents.map((e, i) => (
      <View key={'document ' + i}>
        {
          !!e.uri ?
          <Alert 
            text={e.name}
            type="success"
            onClose={() => this.handleDocumentDelete(i)}
          /> :
          <Button
            text={e.title}
            onClick={() => this.handleDocumentPick(i)}
          />
        }
      </View>
    ));

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card
          avatar={this.state.avatar}
          title={this.state.name}
          text={this.state.description}
          disabled
        />
        <Info
          title="Срок обучения"
          text={this.state.duration}
          disabled
        />
        <Info
          title="Стоимость обучения"
          text={this.state.price}
          disabled
        />
        <Info
          title="Колличество грантных мест"
          text={!!this.state.grants ? this.state.grants : 0}
          disabled
        />
        {documents}
        {
          !!this.state.error &&
          <Alert text={this.state.error} type="error"/>
        }
        <Button
          type="primary"
          text="Подать заявку"
          loading={this.state.saving}
          percentage={this.state.percentage}
          onClick={this.handleSave}
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