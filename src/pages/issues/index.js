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
import { colors, metrics } from '~/styles/';
import { Filter } from '~/components/Filter';
import { ListIssue } from '~/components/ListRepo';
import api from '~/services/api';

class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
  });

  constructor(props) {
    super(props);
    this.state = {
      activeFilter: "all",
      issues: [],
      loading: false,
      error: null,
      loading: false,
    }
  }

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    const { activeFilter } = this.state;
    this.setState({ loading: true });

    try {
      const { data } = await api.get(`/repos/${this.props.navigation.getParam('full_name')}/issues?state=${activeFilter}`);
      this.setState({
        issues: data,
        error: data.length === 0 ? 'Não há nenhuma issue' : null,
      });
    } catch (_err) {
      this.setState({error: 'Não foi possiível obter nenhuma issue'});
    } finally {
      this.setState({ loading: false });
    }


  }

  renderListItem = (data) => <ListIssue issue={data.item} />

  render() {
    const { issues, activeFilter, loading, error } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <Filter
          activeFilter={activeFilter}
          changeFilter={(filter) => this.setState({activeFilter: filter}, () => this.loadIssues())}
        />
        {error && (
          <Text style={styles.error}>{error}</Text>
        )}
        {loading ?
          <ActivityIndicator size="large" style={{ marginTop: metrics.baseMargin }}/>
        :
          <FlatList
            data={issues}
            style={{ paddingBottom: metrics.basePadding * 4 }}
            keyExtractor={item => String(item.id)}
            renderItem={this.renderListItem}
          />
        }
        </View>
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
    padding: metrics.basePadding,
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

export default Issues;
