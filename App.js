import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HabitosPage from './src/pages/HabitosPage';
import LoginPage from './src/pages/LoginPage';

const appNavigator = createStackNavigator(
  {
    'Login': {
      screen: LoginPage,
      navigationOptions:{
        headerShown: false,
      }
    },

    'Habitos': {
      screen: HabitosPage,
      navigationOptions: {
        title: 'Hábitos',
        headerTitleStyle: {
          textAlign: 'left',
          fontSize: 20,
        }
      }
    }
  },
  {
    defaultNavigationOptions: {
      title: 'MyHabitTimeLine',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#6542f4',
        borderBottomColor: '#f4f2ff',
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        flexGrow: 1,
        textAlign: 'center',
      }
    }
  }
);

const AppContainer = createAppContainer(appNavigator);

export default AppContainer;




