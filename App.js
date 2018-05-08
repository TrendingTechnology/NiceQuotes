import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Probleme kann man niemals mit derselben Denkweise lösen, durch die sie
          entstanden sind.
        </Text>
        <Text>-- Albert Einstein</Text>
        <Button title="Nächstes Zitat" onPress={() => alert('Es klappt!')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
