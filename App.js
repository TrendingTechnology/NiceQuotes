import React, { Component } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';

import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';

function StyledButton(props) {
  return (
    <View style={props.style}>
      <Button title={props.title} onPress={props.onPress} />
    </View>
  );
}

export default class App extends Component {
  state = { index: 0, showNewQuoteScreen: false, quotes: [] };

  _retrieveData = async () => {
    let value = await AsyncStorage.getItem('QUOTES');
    if (value !== null) {
      value = JSON.parse(value);
      this.setState({ quotes: value });
    }
  };

  _storeData(quotes) {
    AsyncStorage.setItem('QUOTES', JSON.stringify(quotes));
  }

  _addQuote = (text, author) => {
    let { quotes } = this.state;
    if (text && author) {
      quotes.push({ text, author });
      this._storeData(quotes);
    }
    this.setState({
      index: quotes.length - 1,
      showNewQuoteScreen: false,
      quotes
    });
  };

  _displayNextQuote() {
    let { index, quotes } = this.state;
    let nextIndex = index + 1;
    if (nextIndex === quotes.length) nextIndex = 0;
    this.setState({ index: nextIndex });
  }

  _deleteButton() {
    let { index, quotes } = this.state;
    quotes.splice(index, 1);
    this._storeData(quotes);
    this.setState({ index: 0, quotes });
  }

  componentDidMount() {
    this._retrieveData();
  }

  render() {
    let { index, quotes } = this.state;
    const quote = quotes[index];
    let content = <Text style={{ fontSize: 36 }}>Keine Zitate</Text>;
    if (quote) {
      content = <Quote text={quote.text} author={quote.author} />;
    }
    return (
      <View style={styles.container}>
        <StyledButton
          style={styles.deleteButton}
          title="Löschen"
          onPress={() => this._deleteButton()}
        />
        <StyledButton
          style={styles.newButton}
          title="Neu"
          onPress={() => this.setState({ showNewQuoteScreen: true })}
        />
        <NewQuote
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}
        />
        {content}
        <StyledButton
          style={styles.nextButton}
          title="Nächstes Zitat"
          onPress={() => this._displayNextQuote()}
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
  },
  nextButton: {
    position: 'absolute',
    bottom: 0
  },
  newButton: {
    position: 'absolute',
    right: 0,
    top: 30
  },
  deleteButton: {
    position: 'absolute',
    left: 0,
    top: 30
  }
});
