
import { createStackNavigator } from 'react-navigation';
import Login from './../views/Login';
import Dashboard from './../views/Dashboard';
import ChargeForm from '../views/ChargeForm';
import ChargeConfirm from '../views/ChargeConfirm';
import PaylinkForm from '../views/PaylinkForm';
import PaylinkShare from '../views/PaylinkShare';

const RootStack = createStackNavigator(
    {
        Login: Login,
        Dashboard: Dashboard,
        ChargeForm: ChargeForm,
        ChargeConfirm: ChargeConfirm,
        PaylinkForm: PaylinkForm,
        PaylinkShare: PaylinkShare,
    },
    {
        initialRouteName: 'Login',
    }
);


export default RootStack;