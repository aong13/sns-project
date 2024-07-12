import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Splash from './pages/Splash';

import Home from './pages/mainTab/Home';
import Search from './pages/mainTab/Search';
import Dm from './pages/mainTab/Dm';
import MyPage from './pages/mainTab/MyPage';
import Add from './pages/mainTab/Add';
import FeedDetail from './pages/FeedDetail';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomBottomTap from './components/CustomBottomTap';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTapbar = (props) => <CustomBottomTap {...props} />;

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderTapbar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Dm" component={Dm} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="FeedDetail" component={FeedDetail} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignupPage" component={SignupPage} />
    </Stack.Navigator>
  );
};

export default Router;
