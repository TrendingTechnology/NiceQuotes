// import-Anweisungen
import React, { Component } from 'react'; // wichtig: React Native basiert auf React
import { StyleSheet, Text, View } from 'react-native';
// APIs und Komponenten
// eigene Komponenten...

// Komponente als Klasse
export default class App extends Component {
  render() {
    // Darstellung im UI
    return (
      // JSX
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
      </View>
    );
  }
}

// Styles für Aussehen und Layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
