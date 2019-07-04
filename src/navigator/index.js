import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Admissions from '../screens/Admissions';
import Profile from '../screens/Profile';
import Achievements from '../screens/Achievements';

import Auth from '../screens/Auth';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

import AchievementEdit from '../screens/AchievementEdit';

import InstitutionInfo from '../screens/InstitutionInfo';
import InstitutionNews from '../screens/InstitutionNews';
import InstitutionAdmission from '../screens/InstitutionAdmission';

import News from '../screens/News';

import Specialties from '../screens/Specialties';
import SpecialtiesFromDegree from '../screens/SpecialtiesFromDegree';
import Specialty from '../screens/Specialty';

import AdmissionSuccess from '../screens/AdmissionSuccess';

import Admission from '../screens/Admission';

import Preparatory from '../screens/Preparatory';
import Rules from '../screens/Rules';

const icons = {
  Home: "md-home",
  Admissions: "ios-chatbubbles",
  Profile: "md-person",
  Achievements: "md-school"
}

const BottomTabNavigator = createBottomTabNavigator(
  { 
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Главная'
      }
    }, 
    Admissions: {
      screen: Admissions,
      navigationOptions: {
        title: 'Заявки'
      }
    }, 
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Профиль'
      }
    }, 
    Achievements: {
      screen: Achievements,
      navigationOptions: {
        title: 'Достижения'
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const name = icons[navigation.state.routeName];

        return <Ionicons name={name} size={25} color={tintColor}/>
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2d8cf0',
      inactiveTintColor: '#657180'
    },
    lazy: false
  }
);

const Institution = createMaterialTopTabNavigator(
  {
    InstitutionInfo: {
      screen: InstitutionInfo,
      navigationOptions: {
        title: 'Информация'
      }
    },
    InstitutionNews: {
      screen: InstitutionNews,
      navigationOptions: {
        title: 'Новости'
      }
    },
    InstitutionAdmission: {
      screen: InstitutionAdmission,
      navigationOptions: {
        title: 'Поступающим'
      }
    }
  }, 
  {
    tabBarOptions: {
      activeTintColor: '#2d8cf0',
      inactiveTintColor: '#515a6e',
      tabStyle: {
        paddingHorizontal: 0
      },
      labelStyle: {
        fontSize: 10,
        fontWeight: 'bold'
      },
      indicatorStyle: {
        backgroundColor: '#2d8cf0'
      },
      style: {
        backgroundColor: '#fff'
      }
    }
  }
);

const StackNavigator = createStackNavigator({
  Initial: {
    screen: BottomTabNavigator,
    navigationOptions: { header: null }
  },
  Auth,
  SignIn,
  SignUp,
  AchievementEdit,
  Institution,
  News,
  Specialties,
  SpecialtiesFromDegree,
  Specialty,
  Admission,
  AdmissionSuccess: {
    screen: AdmissionSuccess,
    navigationOptions: { header: null }
  },
  Preparatory,
  Rules
}, {
  defaultNavigationOptions: {
    headerStyle: {
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
      elevation: 0
    },
    headerTintColor: '#515a6e'
  }
});

export default createAppContainer(StackNavigator);