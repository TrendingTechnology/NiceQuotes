import React, { Fragment } from 'react';
import { Text } from 'react-native';

export default function Quote(props) {
  const { text, author } = props;
  return (
    <Fragment>
      <Text style={{ fontSize: 36, fontStyle: 'italic' }}>{text}</Text>
      <Text style={{ fontSize: 20 }}>&mdash; {author}</Text>
    </Fragment>
  );
}
