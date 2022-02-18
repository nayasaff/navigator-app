import { isVoid } from './Helper';
import getCurrency from './get-currency';
import countryLocaleMap from 'country-locale-map';
import Inflector from 'inflector-js';

/**
 *  Utility class for formatting strings.
 *
 * @export
 * @class FormatUtil
 */
export default class FormatUtil {
    /**
     * Formats string into internationalized currency format.
     *
     * @static
     * @param {number} [amount=0]
     * @param {string} [currency='USD']
     * @param {string} [currencyDisplay='symbol']
     * @return {string}
     * @memberof FormatUtil
     */
    static currency(amount = 0, currency = 'USD', currencyDisplay = 'symbol', options = {}) {
        if (isVoid(currency)) {
            // default back to usd
            currency = 'USD';
        }

        const currencyData = getCurrency(currency);
        const locale = countryLocaleMap.getLocaleByAlpha2(currencyData?.iso2)?.replace('_', '-') ?? 'en-US';

        if (currencyData?.precision === 0) {
            options.minimumFractionDigits = 0;
            options.maximumFractionDigits = 0;
        }

        return new Intl.NumberFormat(locale, { style: 'currency', currency, currencyDisplay, ...options }).format(amount);
    }

    /**
     * Capitalize string
     *
     * @static
     * @param {String} string
     * @return {String}
     * @memberof FormatUtil
     */
    static capitalize([first, ...rest]) {
        return first.toUpperCase() + rest.join('');
    }

    /**
     * Format kilometers
     *
     * @static
     * @param {*} km
     * @return {*}
     * @memberof FormatUtil
     */
    static km(km) {
        return `${Math.round(km)}km`;
    }

    /**
     * Pluralize a word
     *
     * @static
     * @param {*} km
     * @return {*}
     * @memberof FormatUtil
     */
    static pluralize(num, word) {
        return num === 1 ? `${num} ${Inflector.singularize(word)}` : `${num} ${Inflector.pluralize(word)}`;
    }

    static secondsToTime(secs) {
        const hours = Math.floor(secs / (60 * 60));
        const divisor_for_minutes = secs % (60 * 60);
        const minutes = Math.floor(divisor_for_minutes / 60);
        const divisor_for_seconds = divisor_for_minutes % 60;
        const seconds = Math.ceil(divisor_for_seconds);

        const obj = {
            h: hours,
            m: minutes,
            s: seconds,
        };

        return obj;
    }

    static formatDuration(secs) {
        let time = FormatUtil.secondsToTime(secs);
        let parts = [];

        if (time.h) {
            parts.push(`${time.h}h`);
        }

        if (time.m) {
            parts.push(`${time.m}m`);
        }

        if (parts.length < 2 && time.s) {
            parts.push(`${time.s}s`);
        }

        if (parts.length === 0) {
            parts.push('0s');
        }

        return parts.join(' ');
    }
}

const formatCurrency = FormatUtil.currency;
const formatKm = FormatUtil.km;
const formatDuration = FormatUtil.formatDuration;
const capitalize = FormatUtil.capitalize;
const pluralize = FormatUtil.pluralize;

export { formatCurrency, formatKm, formatDuration, capitalize, pluralize };