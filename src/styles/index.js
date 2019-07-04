import { StyleSheet } from 'react-native';

import colors from '../../plugins/colors';

export default StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 8,
    paddingTop: 32,
    backgroundColor: colors.background
  },
  flex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: colors.background
  },
  head: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.text,
    margin: 8
  },
  card: {
    padding: 8,
    margin: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.card.border
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    margin: 8,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.avatar
  },
  title: {
    margin: 8,
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    color: colors.text
  },
  description: {
    margin: 8,
    fontSize: 14,
    color: colors.description
  },
  input: {
    padding: 8,
    fontSize: 16,
    color: colors.text
  },
  dictionary: {
    margin: 8
  },
  key: {
    fontSize: 16,
    color: colors.text
  },
  value: {
    fontSize: 16,
    color: colors.description
  }
});