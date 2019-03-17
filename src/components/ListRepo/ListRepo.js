import React from 'React';

import {
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import styles from './styles';


const ListRepo = ({repo, navigation: { navigate }}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={() => navigate('Issues', { title: repo.name, full_name: repo.full_name })}>
      <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.name}>{repo.name}</Text>
        <Text style={styles.login}>{repo.owner.login}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default withNavigation(ListRepo);
