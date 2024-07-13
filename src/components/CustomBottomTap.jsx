import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'

const dmOff = require('../assets/icons/bottomTab/dm_off.png');
const homeOff = require('../assets/icons/bottomTab/home_off.png');
const mypageOff = require('../assets/icons/bottomTab/mypage_off.png');
const searchOff = require('../assets/icons/bottomTab/search_off.png');
const addOff = require('../assets/icons/bottomTab/modify.png');

const dmOn = require('../assets/icons/bottomTab/dm_on.png');
const homeOn = require('../assets/icons/bottomTab/home_on.png');
const mypageOn = require('../assets/icons/bottomTab/mypage_on.png');
const searchOn = require('../assets/icons/bottomTab/search_on.png');

const CustomBottomTap = ({state, navigation, insets, descriptors}) => {
  return (
    <View style={[styles.bottomTabBarWrapper, {paddingBottom: insets.bottom}]}>
        {
          state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label = route.name;
            const isFocused = state.index === index;

            const iconFlag = (bool) => {
              switch (label) {
                case 'Home' :
                  return bool ? homeOn : homeOff;
                case 'Search' :
                  return bool ? searchOn : searchOff;
                case 'Dm' :
                  return bool ? dmOn : dmOff;
                case 'Add' :
                  return bool ? addOff : addOff;  //아이콘이 없어서 임시시             
                default :
                  return bool ? mypageOn : mypageOff;

              }
            }
            
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            })
              if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
              }
            }

            return(
              <TouchableOpacity 
              key={index} 
              style={{ flex: 1, alignItems: 'center' }}
              onPress={onPress}
              activeOpacity={0.7}
              >
                <Image source = {iconFlag(isFocused)} style = {{width:30, height: 30}}/>
              </TouchableOpacity>
            )
          }
        )}
    </View>
  )
}
const styles = StyleSheet.create({
  bottomTabBarWrapper: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      justifyContent: 'space-between',
      borderStyle: 'solid',
      borderTopWidth: 0.5,
      borderColor: '#EEE',
      backgroundColor: '#FFF',
      paddingTop: 10,
      marginBottom: 10, //안드로이드화면에서 안보임
      zIndex: 10
  }
})
export default CustomBottomTap;