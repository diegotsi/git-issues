import React from 'React';

import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

import styles from './styles';


const ListIssue = ({ issue }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={() => Linking.openURL(issue.html_url)}>
      <Image source={{ uri: issue.user.avatar_url }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>{issue.title}</Text>
        <Text style={styles.login}>{issue.user.login}</Text>
      </View>
      <Icon style={styles.icon} name="chevron-right" size={16} />
    </TouchableOpacity>
  )
}

export default ListIssue;
