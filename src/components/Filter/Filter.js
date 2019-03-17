import React from 'React';

import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import styles from './styles';


const Filter = ({activeFilter, changeFilter}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filter} activeOpacity={0.9} onPress={() => changeFilter('all')}>
        <Text style={[styles.text, activeFilter === 'all' && styles.selected]}>Todas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filter} activeOpacity={0.9} onPress={() => changeFilter('open')}>
        <Text style={[styles.text, activeFilter === 'open' && styles.selected]}>Abertas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filter} activeOpacity={0.9} onPress={() => changeFilter('closed')}>
        <Text style={[styles.text, activeFilter === 'closed' && styles.selected]}>Fechadas</Text>
      </TouchableOpacity>
    </View>

  )
}

export default Filter;
