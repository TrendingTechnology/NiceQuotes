import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';

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
  state = { index: 0, showNewQuoteScreen: false };

  render() {
    let index = this.state.index;
    const quote = data[index];
    let nextIndex = index + 1;
    if (nextIndex === data.length) nextIndex = 0;
    return (
      <View style={styles.container}>
        <View style={styles.newButton}>
          <Button
            title="Neu"
            onPress={() => this.setState({ showNewQuoteScreen: true })}
          />
        </View>
        <NewQuote visible={this.state.showNewQuoteScreen} />
        <Quote text={quote.text} author={quote.author} />
        <View style={styles.nextButton}>
          <Button
            title="Nächstes Zitat"
            onPress={() => this.setState({ index: nextIndex })}
          />
        </View>
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
  },
  nextButton: {
    position: 'absolute',
    bottom: 0
  },
  newButton: {
    position: 'absolute',
    right: 0,
    top: 30
  }
});
