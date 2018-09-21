import Moment from 'moment';

export default Format = {

    currency(value) {
        return (value / 100).toFixed(2)
    },

    date(datetime) {
        Moment.locale('en-US');
        return Moment(datetime).format('DD/MM/YYYY');
    }

}