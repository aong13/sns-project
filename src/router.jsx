import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Splash from './pages/Splash';
import Home from './pages/Home';
import Search from './pages/Search';
import Dm from './pages/Dm';
import MyPage from './pages/MyPage';
import CustomBottomTap from './components/CustomBottomTap';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTapbar = (props) => <CustomBottomTap {...props}/>
const MainTab = () => {
    return (
        <Tab.Navigator 
            tabBar={renderTapbar}
            screenOptions={{
                headerShown: false
        }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Dm" component={Dm} />
            <Tab.Screen name="MyPage" component={MyPage} />

        </Tab.Navigator>

    )
}
const Router = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            //gestureEnabled: false
        }}>
            <Stack.Screen name="Splash" component={Splash} options={{ animation: 'fade_from_bottom'}} />
            <Stack.Screen name="MainTab" component={MainTab} />

        </Stack.Navigator>
    )
}

export default Router;