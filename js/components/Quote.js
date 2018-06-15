import React, { Fragment } from 'react';
import { Text } from 'react-native';

export default function Quote(props) {
  const { text, author } = props;
  return (
    <Fragment>
      <Text>{text}</Text>
      <Text>-- {author}</Text>
    </Fragment>
  );
}
