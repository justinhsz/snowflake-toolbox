import ResultSet from './resultset';
import util from 'snowflake-sdk/lib/util';
import Column from 'snowflake-sdk/lib/connection/result/column';

class Statement {

    /**
     * Constructor snowflake object to start.
     *
     * @param {RowStatementPreExec} sdkStatement
     *
     * @constructor
     */
    constructor(sdkStatement) {
        this._sdkStatement = sdkStatement;

        /**
         * Get Column by column name or column index
         *
         * @param {String|Number} col
         *
         * @return {Column}
         */
        this._getSDKColumn = function(col) {
            sdkStatement.getColumn(col)
        };

        /**
         * Get Column by column index
         *
         * @param {Number} colIdx
         *
         * @return {Column}
         */
        this._getSDKColumnByIndex = function (colIdx) {
            if(util.isNumber(colIdx)) {
                this._getSDKColumn(colIdx)
            } else {
                throw new Error("The parameter 'colIdx' is not a number.");
            }
        }
    }

    /**
     * This method executes the prepared statement stored in this Statement object.
     *
     * @return {ResultSet} A result set in the form of a ResultSet object.
     */
    execute() {
        return new ResultSet(this._sdkStatement);
    }

    /**
     * This method returns the UUID of the most recent query executed.
     *
     * @return {String} A string containing a UUID, which is the query ID.
     */
    getQueryId() {
        return this._sdkStatement.getStatementId();
    }

    /**
     * This method returns the text of the prepared query in the Statement object.
     *
     * @return {String} A string of the prepared query text.
     */
    getSqlText() {
        return this._sdkStatement.getSqlText();
    }

    /**
     * This method returns the number of columns in the result set for an executed query.
     * If the query has not yet been executed, this method throws an Error.
     *
     * @return {Number} The number of columns.
     */
    getColumnCount() {
        return this._sdkStatement.getColumns().length;
    }

    /**
     * This method returns the number of rows in the result set for an executed query.
     * If the query has not yet been executed, this method throws an Error.
     *
     * @return {Number} The number of rows.
     */
    getRowCount() { // number
        return this._sdkStatement.getNumRows();
    }

    /**
     * This method returns the number of rows in the result set for an executed query.
     * If the query has not yet been executed, this method throws an Error.
     *
     * @param {String|Number} col
     *
     * @return {String} The number of rows.
     */
    getColumnSqlType(col) {
        return this._getSDKColumn(col).getType();
    }

    /**
     * This method returns the JavaScript data type of the specified column.
     *
     * @param {String|Number} col
     *
     * @return {String} The JavaScript data type of the column.
     *
     */
    getColumnType(col) {
        let sqlType = this.getColumnSqlType(col).toUpperCase();
        if (sqlType === "BOOLEAN") {
            return "boolean";
        } else if (sqlType === "DATE") {
            return "date";
        } else if (sqlType === "ARRAY" || sqlType === "VARIANT") {
            return "JSON";
        } else if (sqlType === "REAL" || sqlType.startsWith("FLOAT") || sqlType.startsWith("DOUBLE")) {
            return "number";
        } else if (sqlType === "STRING" || sqlType === "TEXT" || sqlType === "TIME" ||
            sqlType.startsWith("CHAR") || sqlType.endsWith("CHAR")) {
            return "string";
        } else if (sqlType.includes("TIMESTAMP")) {
            return "SfDate";
        } else {
            throw new Error("The SQL type '" + sqlType + "' is not in the data type mapping document.")
        }
    }

    /**
     * This method returns the name of the specified column.
     *
     * @param {Number} colIdx
     *
     * @return {String} The JavaScript data type of the column.
     */
    getColumnName(colIdx) {
        return this._getSDKColumnByIndex(colIdx).getName()
    }

    /**
     * This method returns the scale of the specified column.
     * The scale is the number of digits after the decimal point.
     * The scale of the column was specified in the CREATE TABLE or ALTER TABLE statement.
     *
     * @param {Number} colIdx
     *
     * @return {Number} The scale of the column (for numeric columns); 0 for non-numeric (columns).
     */
    getColumnScale(colIdx) {
        return this._getSDKColumnByIndex(colIdx).getScale();
    }

    /**
     * This method returns whether the specified column allows SQL NULL values.
     *
     * @param {Number} colIdx
     *
     * @return {Boolean} true if the column allows SQL NULL values; otherwise, false.
     */
    isColumnNullable(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isNullable();
    }

    /**
     * This method returns true if the column data type is one of the following SQL text data types:
     * CHAR or CHAR(N), as well as their synonyms CHARACTER and CHARACTER(N)
     * VARCHAR or VARCHAR(N)
     * STRING
     * TEXT
     *
     * @param {Number} colIdx
     *
     * @return {Boolean} true if the column data type is one of the SQL text data types; false for all other data types.
     */
    isColumnText(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isString();
    }

    /**
     *
     *
     * @param {Number} colIdx
     *
     * @return {Boolean}
     */
    isColumnArray(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isArray();
    }

    /**
     *
     *
     * @param {Number} colIdx
     *
     * @return {Boolean}
     */
    isColumnBinary(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isBinary();
    }

    /**
     *
     *
     * @param {Number} colIdx
     *
     * @return {Boolean}
     */
    isColumnBoolean(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isBoolean();
    }

    /**
     *
     *
     * @param {Number} colIdx
     *
     * @return {Boolean}
     */
    isColumnDate(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isDate();
    }

    /**
     *
     *
     * @param {Number} colIdx
     *
     * @return {Boolean}
     */
    isColumnNumber(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isNumber();
    }

    /**
     *
     *
     * @param {Number} colIdx
     *
     * @return {Boolean}
     */
    isColumnObject(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isObject();
    }

    /**
     *
     *
     * @param {Number} colIdx
     *
     * @return {Boolean}
     */
    isColumnTime(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isTime();
    }

    /**
     *
     *
     * @param {Number} colIdx
     *
     * @return {Boolean} true if the column data type is one of the SQL timestamp types:
     *  TIMESTAMP,
     *  TIMESTAMP_LTZ,
     *  TIMESTAMP_NTZ, or
     *  TIMESTAMP_TZ;
     * false for all other data types, including other date and time data types
     * (DATE, TIME, or DATETIME).
     */
    isColumnTimestamp(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isTimestamp();
    }

    /**
     *
     *
     * @param {Number} colIdx
     *
     * @return {Boolean} true if the column data type is VARIANT (for semi-structured data);
     * false for all other data types.
     */
    isColumnVariant(colIdx) {
        return this._getSDKColumnByIndex(colIdx).isVariant();
    }
}

export default Statement;