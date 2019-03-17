import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    alignItems: 'center',
    marginBottom: metrics.baseMargin,
  },

  content: {
    flex: 1,
    marginLeft: metrics.baseMargin,
  },
  icon: {
    color: colors.light,
    marginLeft: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  name: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.darker,
    marginBottom: 4,
  },

  login: {
    fontSize: 14,
    color: colors.regular,
  }
})

export default styles;
