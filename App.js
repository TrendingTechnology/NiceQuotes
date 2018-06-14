import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const data = [
  {
    text:
      'Probleme kann man niemals mit derselben Denkweise lösen, durch die sie entstanden sind.',
    author: 'Albert Einstein'
  },
  {
    text:
      'Man braucht nichts im Leben zu fürchten, man muss nur alles verstehen.',
    author: 'Marie Curie'
  },
  { text: 'Nichts ist so beständig wie der Wandel.', author: 'Heraklit' }
];

export default class App extends Component {
  state = { index: 0 }; // initialer Zustand

  // render: Darstellung der Komponente im UI
  // render wird automatisch ausgeführt:
  // a) Komponente erscheint im UI (initialer Zustand in state)
  // b) Zustand ändert sich (state) [ ==> this.setState(...)]
  render() {
    let index = this.state.index;
    const quote = data[index];
    return (
      <View style={styles.container}>
        <Text>{quote.text}</Text>
        <Text>-- {quote.author}</Text>
        <Button
          title="Nächstes Zitat"
          onPress={() => this.setState({ index: 1 })}
        />
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
