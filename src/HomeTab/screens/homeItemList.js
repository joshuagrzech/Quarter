import React from 'react'
import { styles } from 'assets/stylesheet.js'
import { View, FlatList } from 'react-native'
import { HomeListItem } from '../touchables'
import XDate from 'xdate'
import { HomeTabLinearGradient } from '../styled-components/LinearGradient'
import { DateHeader } from '../functions'
import { HomeItemDateContainer, HomeItemDateView } from '../styled-components/View'

export const homeItemList = (items, printObj, navigation, index) => {
  console.log(items)
  const renderHomeItem = (item) => (
    <View style={{marginTop: '5%'}}>
      <HomeItemDateContainer>
        <HomeItemDateView>{renderDate(item.item.id, item.item.due)}</HomeItemDateView>
      </HomeItemDateContainer>
      <HomeListItem item={item.item} navigation={navigation} />
    </View>
  )
  const renderDate = (id, date) => {
    const displayDate = new XDate(date)
    if (Object.values(printObj).length === 0) {
      return <DateHeader date={displayDate} />
    }
    if (printObj[date] === id) {
      return <DateHeader date={displayDate} />
    }
  }
  const colorFromType = () => {
    switch (index) {
      case 0:
        return '#1e90ff'
        break;
      case 1: 
        return '#34e89e'
        break;
      case 2:  
        return '#ff00cc'
      case 3:
        return '#ff6a00'
      default:
        break;
    }
      
  }
  return (
    <>
 
    <FlatList
    data={items}
    id="id"
    contentInset={{
      top: 0,
      left: 0,
      right: 0,
      bottom: items.length * 100
    }}
    showsVerticalScrollIndicator={false}
    contentstyle={{width: '95%', alignSelf: 'center'}}
    outAnimation="bounceOut"
    renderItem={(item) => renderHomeItem(item, printObj)}
  />
  </>
  )
}
