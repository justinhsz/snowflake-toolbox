import SfTimestamp from 'snowflake-sdk/lib/connection/result/sf_timestamp';

class SfDate {
    /**
     * Constructor SfDate.
     *
     * @param {SfTimestamp} sfTimestamp
     */
    constructor(sfTimestamp) {
        this._sfTimestamp = sfTimestamp;
    }

    /**
     * This method returns the number of seconds since the beginning of “the epoch” (midnight January 1, 1970).
     *
     * @return {Number} The number of seconds between midnight January 1, 1970 and the timestamp stored in the variable.
     */
    getEpochSeconds() {
        return this._sfTimestamp.epochSeconds;
    }

    /**
     * This method returns the value of the nanoseconds field of the object.
     * Note that this is just the fractional seconds,
     * not the nanoseconds since the beginning of the epoch.
     * Thus the value is always between 0 and 999999999.
     *
     * @return {Number} The number of nanoseconds.
     */
    getNanoSeconds() {
        return this._sfTimestamp.nanoSeconds;
    }

    /**
     * This method returns the precision of the data type,
     * i.e. the number of digits after the decimal point.
     * For example, the precision of TIMESTAMP_NTZ(3) is 3 (milliseconds).
     * The precision of TIMESTAMP_NTZ(0) is 0 (no fractional seconds).
     * The precision of TIMSTAMP_NTZ is 9 (nanoseconds).
     * The minimum is 0. The maximum is 9 (precision is to 1 nanosecond).
     * The default precision is 9.
     *
     * @return {Object} The number of digits after the decimal place (number of digits in the fractional seconds field).
     */
    getScale() {
        return this._sfTimestamp.scale;
    }

    /**
     * This method returns the timezone as the number of minutes before or after UTC.
     *
     * @return {String} The timezone as a number of minutes before or after UTC.
     */
    getTimezone() {
        return this._sfTimestamp.timezone;
    }

    /**
     * @return {String} This method returns a string representation of the timestamp.
     */
    toString() {
        return this._sfTimestamp.toString();
    }
}

export default SfDate;