
import { createStackNavigator } from 'react-navigation';
import Login from './../views/Login';
import Dashboard from './../views/Dashboard';
import ChargeForm from '../views/ChargeForm';
import ChargeConfirm from '../views/ChargeConfirm';

const RootStack = createStackNavigator(
    {
        Login: Login,
        Dashboard: Dashboard,
        ChargeForm: ChargeForm,
        ChargeConfirm: ChargeConfirm,
    },
    {
        initialRouteName: 'Login',
    }
);


export default RootStack;