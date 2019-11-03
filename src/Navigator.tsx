import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {MainScreen} from './MainScreen';
import {SearchScreen} from './SearchScreen';
import {CharacterScreen} from './CharacterScreen';

const Navigator = createStackNavigator(
  {
    MainScreen,
    SearchScreen,
    CharacterScreen,
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
  },
);

export default createAppContainer(Navigator);
