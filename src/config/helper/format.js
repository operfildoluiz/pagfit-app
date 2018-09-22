import Moment from 'moment';

export default Format = {

    currency(value) {
        return (value / 100).toFixed(2)
    },

    cleanCurrency(value) {
        let a = value.toString().replace(/[^0-9]+/g, '');

        return parseInt(a);
    },  

    date(datetime) {
        Moment.locale('en-US');
        return Moment(datetime).format('DD/MM/YYYY');
    },

    slashDate(b) {
        return [b.slice(0, 2),'/' ,b.slice(2,4), '/', b.slice(4)].join('');
    },

}