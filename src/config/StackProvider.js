
import { createStackNavigator } from 'react-navigation';
import Login from './../views/Login';
import Dashboard from './../views/Dashboard';
import ChargeForm from '../views/ChargeForm';
import ChargeConfirm from '../views/ChargeConfirm';
import PaylinkForm from '../views/PaylinkForm';
import PaylinkShare from '../views/PaylinkShare';
import PaylinkScan from '../views/PaylinkScan';
import Test from '../views/Test';

const RootStack = createStackNavigator(
    {
        Test: Test,
        Login: Login,
        Dashboard: Dashboard,
        ChargeForm: ChargeForm,
        ChargeConfirm: ChargeConfirm,
        PaylinkForm: PaylinkForm,
        PaylinkShare: PaylinkShare,
        PaylinkScan: PaylinkScan,
    },
    {
        initialRouteName: 'Login',
    }
);


export default RootStack;