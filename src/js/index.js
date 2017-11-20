import $ from 'jquery';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import {getLanguage} from './language';

const log = (val) => {
    console.log(val);
};


const paymentFormat = wNumb({
    decimals: 2,
    mark: '.',
    thousand: ' ',
    prefix: '',
    postfix: '₽'
});

const caclMonthlyPaiment = () => {

    const PERC = 11;
    const sum = $('#sum').val();
    const term = $('#term').val();

    const monthlyPerc = (sum / 100 * PERC) / 12;

    const payment = sum / term + monthlyPerc;

    console.log(payment);

    $('.monthly_payment .value').html(paymentFormat.to(payment));

};

window.addEventListener('load', () => {
    caclMonthlyPaiment();
});

/**
 * Сумма
 */
const sumSlider = document.getElementById('sum-slider');
const sumValue = document.getElementById('sum');

const sumFormat = wNumb({
    decimals: 0,
    mark: '.',
    thousand: ' ',
    prefix: '',
    postfix: '₽'
});

noUiSlider.create(sumSlider, {
    start: 400000,
    range: {
        min: 400000,
        max: 60000000
    },
    format: sumFormat,
    tooltips: true,
    step: 10000
});

sumSlider.noUiSlider.on('update', function( values, handle ) {

    const value = values[handle].match(/[\d]/g).join('');

    sumValue.value = Math.round(value);

    caclMonthlyPaiment();

});

$(sumValue).change(({target}) => {

    sumSlider.noUiSlider.set(target.value);

    caclMonthlyPaiment();

});



/**
 * Срок кредита
 */
const termSlider = document.getElementById('term-slider');
const termValue = document.getElementById('term');

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
        min: 2,
        max: 360
    },
    format: termFormat,
    tooltips: true,
    step: 2
});

termSlider.noUiSlider.on('update', function( values, handle ) {

    const value = values[handle].match(/[\d]/g).join('');

    termValue.value = Math.round(value);

    caclMonthlyPaiment();

});

$(termValue).change(({target}) => {

    termSlider.noUiSlider.set(target.value);

    caclMonthlyPaiment();

});

