import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { SQLite } from 'expo';

import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';

const database = SQLite.openDatabase('quotes.db');

function StyledButton(props) {
  let button = null;
  if (props.visible)
    button = (
      <View style={props.style}>
        <Button title={props.title} onPress={props.onPress} />
      </View>
    );
  return button;
}

export default class App extends Component {
  state = { index: 0, showNewQuoteScreen: false, quotes: [] };

  _retrieveData() {
    database.transaction(transaction =>
      transaction.executeSql('SELECT * FROM quotes', [], (_, result) =>
        this.setState({ quotes: result.rows._array })
      )
    );
  }

  _saveQuoteToDB(text, author, quotes) {
    database.transaction(transaction =>
      transaction.executeSql(
        'INSERT INTO quotes (text, author) VALUES (?,?)',
        [text, author],
        (_, result) => (quotes[quotes.length - 1].id = result.insertId)
      )
    );
  }

  _removeQuoteFromDB(id) {
    database.transaction(transaction =>
      transaction.executeSql('DELETE FROM quotes WHERE id = ?', [id])
    );
  }

  _addQuote = (text, author) => {
    let { quotes } = this.state;
    if (text && author) {
      quotes.push({ text, author });
      this._saveQuoteToDB(text, author, quotes);
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
    Alert.alert(
      'Zitat löschen?',
      'Dies kann nicht rückgängig gemacht werden.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: () => this._deleteQuote()
        }
      ]
    );
  }

  _deleteQuote() {
    let { index, quotes } = this.state;
    this._removeQuoteFromDB(quotes[index].id);
    quotes.splice(index, 1);
    this.setState({ index: 0, quotes });
  }

  componentDidMount() {
    database.transaction(transaction =>
      transaction.executeSql(
        'CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY NOT NULL, text TEXT, author TEXT);'
      )
    );
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
          visible={quotes.length >= 1}
          title="Löschen"
          onPress={() => this._deleteButton()}
        />
        <StyledButton
          style={styles.newButton}
          visible={true}
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
          visible={quotes.length >= 2}
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
