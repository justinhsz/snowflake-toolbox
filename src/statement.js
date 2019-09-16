const ResultSet = require("./resultset");

class Statement {
    constructor(sdkStatement) {
        this.sdkStatement = sdkStatement;
    }

    execute() { //ResultSet
        return new ResultSet(this.sdkStatement.execute());
    }

    getQueryId() { //string

    }

    getSqlText() { //string
        return this.sdkStatement.getSqlText();
    }

    getColumnCount() { // number

    }

    getRowCount() { // number

    }

    getColumnSqlType(col) { // input: string or number => dataType

    }

    getColumnType(col) { // input: string or number => dataType

    }

    getColumnName(colIdx) {

    }

    getColumnScale(colIdx) { // number

    }

    isColumnNullable(colIdx) { // boolean

    }

    isColumnText(colIdx) { // boolean

    }

    isColumnArray(colIdx) { // boolean

    }

    isColumnBinary(colIdx) { // boolean

    }

    isColumnBoolean(colIdx) { // boolean

    }

    isColumnDate(colIdx) { // boolean

    }

    isColumnNumber(colIdx) { // boolean

    }

    isColumnObject(colIdx) { // boolean

    }

    isColumnTime(colIdx) { // boolean

    }

    isColumnTimestamp(colIdx) { // boolean

    }

    isColumnVariant(colIdx) { // boolean

    }
}

exports.Statement = Statement;