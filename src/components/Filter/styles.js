import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.light,
    borderRadius: metrics.baseRadius,
    marginBottom: metrics.baseMargin,
  },
  filter: {
    flex: 1,
    padding: metrics.basePadding / 3,
  },
  selected: {
    fontWeight: 'bold',
    color: colors.darkTransparent,
  },
  text: {
    color: colors.darkTransparent,
    textAlign: 'center',
  }
})

export default styles;
