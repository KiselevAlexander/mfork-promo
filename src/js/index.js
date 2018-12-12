import $ from 'jquery';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

const log = (val) => {
    console.log(val);
};

const CALC_DATA = {
    sum: 400000,
    term: 12
};


const paymentFormat = wNumb({
    decimals: 0,
    mark: '.',
    thousand: ' ',
    prefix: '',
    postfix: ' ₽'
});

const caclMonthlyPaiment = () => {

    const PERC = 11;
    const sum = CALC_DATA.sum;
    const term = CALC_DATA.term;

    const monthlyPerc = (sum / 100 * PERC) / 12;

    const payment = sum / term + monthlyPerc;

    console.log(payment);

    $('.value.-pay').html(paymentFormat.to(payment));

};

window.addEventListener('load', () => {
    caclMonthlyPaiment();
});

/**
 * Сумма
 */
const sumSlider = document.getElementById('sum-slider');

const sumFormat = wNumb({
    decimals: 0,
    mark: '.',
    thousand: ' ',
    prefix: '',
    postfix: ' ₽'
});

noUiSlider.create(sumSlider, {
    start: 400000,
    range: {
        min: 400000,
        max: 30000000
    },
    format: sumFormat,
    tooltips: false,
    step: 10000
});

sumSlider.noUiSlider.on('update', function( values, handle ) {

    CALC_DATA.sum = values[handle].match(/[\d]/g).join('');

    $('.value.-sum').html(values[handle]);

    caclMonthlyPaiment();

});


/**
 * Срок кредита
 */
const termSlider = document.getElementById('term-slider');

const termFormat = wNumb({
    decimals: 0,
    mark: '.',
    thousand: ' ',
    prefix: '',
    postfix: ' мес'
});

noUiSlider.create(termSlider, {
    start: 12,
    range: {
        min: 6,
        max: 120
    },
    format: termFormat,
    tooltips: false,
    step: 6
});

termSlider.noUiSlider.on('update', function( values, handle ) {

    CALC_DATA.term = values[handle].match(/[\d]/g).join('');

    $('.value.-term').html(values[handle]);

    caclMonthlyPaiment();

});
