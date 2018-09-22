
import { createStackNavigator } from 'react-navigation';
import Login from './../views/Login';
import Dashboard from './../views/Dashboard';
import ChargeForm from '../views/ChargeForm';

const RootStack = createStackNavigator(
    {
        Login: Login,
        Dashboard: Dashboard,
        ChargeForm: ChargeForm,
    },
    {
        initialRouteName: 'Login',
    }
);


export default RootStack;