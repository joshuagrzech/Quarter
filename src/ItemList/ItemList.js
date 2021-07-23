import React from 'react'
import { styles } from 'assets/stylesheet.js'
import { View, FlatList } from 'react-native'
import { ListItem } from './touchables'

const ItemList = (props) => {
  const renderHomeItem = (item) => (
    <View style={{width: '95%'}}>
      <ListItem item={item.item} navigation={props.navigation} />
    </View>
  )
  return (
    <FlatList
      data={props.items}
      id="id"
      contentInset={{
        top: 0,
        left: 0,
        right: 0,
        bottom: props.items.length * 100
      }}
      contentstyle={styles.style150}
      outAnimation="bounceOut"
      renderItem={(item) => renderHomeItem(item)}
    />
  )
}
export default ItemList
