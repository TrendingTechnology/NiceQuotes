import React, { Component } from 'react';
import { Button, Modal, TextInput } from 'react-native';

export default class NewQuote extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={this.props.onSave}
        animationType="slide"
      >
        <Button title="Speichern" onPress={this.props.onSave} />
      </Modal>
    );
  }
}
