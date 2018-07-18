import React, { Component } from 'react';
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native';

export default class NewQuote extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={this.props.onSave}
        animationType="slide"
      >
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Inhalt des Zitats"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.input}
            placeholder="Autor/in des Zitats"
            underlineColorAndroid="transparent"
          />
          <Button title="Speichern" onPress={this.props.onSave} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'deepskyblue',
    borderRadius: 4,
    width: '80%',
    marginBottom: 20,
    fontSize: 20,
    padding: 10,
    height: 50
  }
});
