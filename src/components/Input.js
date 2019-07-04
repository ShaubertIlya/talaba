import React, { Component } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet
} from 'react-native';

export default class Class extends Component {
  constructor(props) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleEndEditing = this.handleEndEditing.bind(this);
    this.handleSubmitEditing = this.handleSubmitEditing.bind(this);
  }

  state = {
    focused: false
  }

  handleFocus() {
    if(this.props.onFocus) this.props.onFocus();
    
    this.setState({focused: true});
  }

  handleEndEditing() {
    if(this.props.onEndEditing) this.props.onEndEditing();

    this.setState({focused: false});
  }

  handleSubmitEditing() {
    if(this.props.onSubmitEditing) this.props.onSubmitEditing();
  }

  focus() {
    this._input.focus()
  }

  render() {
    return (
      <View style={styles.container}>
        {
          !!this.props.title &&
          <Text style={styles.title}>
            {this.props.title}
          </Text>
        }
        <TextInput
          ref={(input) => this._input = input}
          style={[
            styles.input,
            !this.state.focused ? styles.default : styles.focused
          ]}
          autoFocus={this.props.autoFocus}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChangeText={this.props.onChange}
          secureTextEntry={this.props.secure}
          placeholderTextColor="#c5c8ce"
          selectionColor="#5cadff"
          onFocus={this.handleFocus}
          onEndEditing={this.handleEndEditing}
          onSubmitEditing={this.handleSubmitEditing}
          blurOnSubmit={false}
          returnKeyType={this.props.returnKeyType}
          keyboardType={this.props.keyboardType}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 6
  },
  title: {
    color: '#515a6e',
    fontSize: 16,
    marginBottom: 8
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,

    borderRadius: 4,
    borderWidth: 1,

    fontSize: 16,
    color: '#515a6e'
  },
  default: {
    borderColor: '#dcdee2'
  },
  focused: {
    borderColor: '#57a3f3'
  }
});