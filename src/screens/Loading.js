import React, { Component } from 'react';
import { 
  View, 
  ActivityIndicator, 
  StyleSheet
} from 'react-native';

export default class Class extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#dcdee2"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

