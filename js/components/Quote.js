import React, { Fragment } from 'react';
import { Text } from 'react-native';

export default function Quote(props) {
  const { text, author } = props;
  return (
    <Fragment>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.author}>&mdash; {author}</Text>
    </Fragment>
  );
}

const styles = {
  text: {
    fontSize: 36,
    fontStyle: 'italic'
  },
  author: {
    fontSize: 20
  }
};
