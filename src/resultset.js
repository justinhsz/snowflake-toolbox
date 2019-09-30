import Column from 'snowflake-sdk/lib/connection/result/column';
import SfTimestamp from 'snowflake-sdk/lib/connection/result/sf_timestamp';
import SfDate from './sfdate';

class ResultSet {
    /**
     * Constructor ResultSet.
     *
     * @param {RowStatementPreExec} statement
     */
    constructor(statement) {
        this._statement = statement;
        this._rows = [];
        this._pointer = -1;
        this._rowNumber = statement.getNumRows();
        let _stream = statement.streamRows;

        _stream.on('data', function(row) {
            this._rowNumber = this._rowNumber + 1;
            this._rows.push(row);
        }).on('error', function(err) {
            throw new Error('Unable to consume all rows');
        });

        /**
         * Get Column by column name or column index
         *
         * @param {String|Number} col
         *
         * @return {Column}
         */
        this._getSDKColumn = function(col) {
            this._statement.getColumn(col);
        };
    }

    /**
     * This method gets the next row in the ResultSet and makes it available for access.
     * This method does not return the new data row. Instead, it makes the row available so that you can call methods such as ResultSet.getColumnValue() to retrieve the data.
     * Note that you must call next() for each row in the result set, including the first row.
     *
     * @return {Boolean} true if it retrieved a row and false if there are no more rows to retrieve.
     */
    next() {
        this._pointer = this._pointer + 1;
        return this._rowNumber > this._pointer;
    }

    /**
     * This method returns the SQL data type of the specified column.
     *
     * @param {String|Number} col
     *
     * @return {String} The SQL data type of the column.
     */
    getColumnSqlType(col) {
        return this._getSDKColumn(col).getType();
    }

    /**
     * This method returns the value of a column in the current row
     * (i.e. the row most recently retrieved by next()).
     *
     * @param {String|Number} col
     *
     * @return {Boolean|String|Number|Date|Object|SfDate} The value of the specified column.
     */
    getColumnValue(col) {
        let result = this._rows[this._pointer];
        return result instanceof SfTimestamp ? new SfDate(result) : result;
    }

    /**
     * This method returns the value of a column as a string,
     * which is useful when you need a column value regardless of the original data type in the table.
     *
     * @param {String|Number} col
     *
     * @return {String} The value of the specified column.
     */
    getColumnValueAsString(col) {
        return this._rows[this._pointer].toString();
    }

    /**
     * This method returns the UUID of the most recent query executed.
     *
     * @return {String} A string containing a UUID, which is the query ID.
     */
    getQueryId() {
        return this._statement.getStatementId();
    }
}

export default ResultSet;