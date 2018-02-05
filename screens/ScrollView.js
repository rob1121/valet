import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';

export default class ScrollViews extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    
    this.state = {
      dataSource: ds.cloneWithRows([
        { 'name': 'Ben', 'id': 1 },
        { 'name': 'Susan', 'id': 2 },
        { 'name': 'Robert', 'id': 3 },
        { 'name': 'Mary', 'id': 4 },
        { 'name': 'Daniel', 'id': 5 },
        { 'name': 'Laura', 'id': 6 },
        { 'name': 'John', 'id': 7 },
        { 'name': 'Debra', 'id': 8 },
        { 'name': 'Aron', 'id': 9 },
        { 'name': 'Ann', 'id': 10 },
        { 'name': 'Steve', 'id': 11 },
        { 'name': 'Olivia', 'id': 12 }
      ]),
    };
  }

  _rowHasChanged() {
    return this.state.names;
  }

  render() {
    return (
      <View>
        
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(item) => <Text>{item.name}</Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
  }
})