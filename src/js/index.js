import $ from 'jquery';
import noUiSlider from 'nouislider';
import {getLanguage} from './language';

const log = (val) => {
    console.log(val);
};

const formatMoney = function(c, d, t){
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d === undefined ? "." : d,
        t = t === undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

Number.prototype.formatMoney = formatMoney;
String.prototype.formatMoney = formatMoney;

/**
 * Сумма
 */
const sumSlider = document.getElementById('sum-slider');
const sumValue = document.getElementById('sum');

noUiSlider.create(sumSlider, {
    start: 40,
    range: {
        min: 400000,
        max: 60000000
    },
    step: 10000
});

sumSlider.noUiSlider.on('update', function( values, handle ) {

    const value = values[handle];

    sumValue.value = Math.round(value);

});



/**
 * Срок кредита
 */
const termSlider = document.getElementById('term-slider');
const termValue = document.getElementById('term');

noUiSlider.create(termSlider, {
    start: 12,
    range: {
        min: 12,
        max: 360
    },
    step: 1
});

termSlider.noUiSlider.on('update', function( values, handle ) {

    const value = values[handle];

    termValue.value = Math.round(value);

});


