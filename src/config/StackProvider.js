
import { createStackNavigator } from 'react-navigation';
import Login from './../views/Login';
import Dashboard from './../views/Dashboard';

const RootStack = createStackNavigator(
    {
        Login: Login,
        Dashboard: Dashboard,
    },
    {
        initialRouteName: 'Login',
    }
);


export default RootStack;