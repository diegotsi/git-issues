import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import '~/config/ReactotronConfig';
import api from '~/services/api';
import { ListRepo } from '~/components/ListRepo';
import { colors, metrics } from '~/styles/';


class Home extends Component {
  static navigationOptions = {
    title: 'GitIssues',
  };

  constructor(props) {
    super(props);
    this.state = {
      repositoryInput: null,
      repositories: [],
      error: null,
      loading: false,
    }
  }

  componentDidMount() {
    this.loadRepositores();
  }


  loadRepositores = async () => {
    const repositories = JSON.parse(await AsyncStorage.getItem('GitIssues:repositories'));

    this.setState({
      repositories,
    })
  }

  getRepo = async () => {
    const { repositoryInput, repositories } = this.state;

    if (!repositoryInput) {
      this.setState({ error: 'Preencha o repositório para continuar', loadingButton: false });
      return;
    }

    if (repositories.find(repo => repo.full_name === repositoryInput)){
      this.setState({
        error: 'Repositório duplicado',
        loading: false,
      })
      return;
    }

    try {
      this.setState({loading: true});
      const { data } = await api.get(`/repos/${repositoryInput}`);
      AsyncStorage.setItem('GitIssues:repositories', JSON.stringify([...repositories, data]));
      this.loadRepositores();
    } catch(_err) {
      this.setState({
        error: 'Repositório inexistente',
      })
    } finally {
      this.setState({
        repositoryInput: '',
        loading: false,
      })
    }
  }


  renderListItem = (data) => <ListRepo repo={data.item} />
  render() {

    const { repositories, error, loading } = this.state;
    console.tron.log(repositories);
    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.form}>
        {error && (
          <Text style={styles.error}>{error}</Text>
        )}
        <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          value={this.state.repositoryInput}
          style={styles.input}
          placeholder="Adicionar novo repositório"
          onChangeText={(repositoryInput) => this.setState({ repositoryInput })}
        />
         <TouchableOpacity onPress={this.getRepo}>
            {loading ?
            <ActivityIndicator size="small" />
            :
            <Icon name="plus" size={20}/>}
          </TouchableOpacity>
          </View>
        </View>
        {repositories.length > 0 && (
          <FlatList
            data={repositories}
            style={{ padding: metrics.basePadding, paddingBottom: metrics.basePadding * 4 }}
            keyExtractor={item => String(item.id)}
            onRefresh={this.loadRepositores}
            refreshing={loading}
            renderItem={this.renderListItem}
          />
        )}


      </View>
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
  error: {
    color: colors.danger,
  },
  form: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    padding: metrics.basePadding,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    color: colors.darker,
    flex: 1,
    fontSize: 14,
    marginRight: metrics.baseMargin,
    padding: metrics.basePadding / 2,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Home;
