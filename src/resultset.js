class ResultSet {
    constructor(sdkResultSet) {
        this.sdkResultSet = sdkResultSet;
    }

    next() {

    }

    getColumnSqlType(col) { // input: string or number => dataType

    }

    getColumnValue(col) { // input: string or number => value

    }

    getColumnValueAsString(col) { // input: string or number => String

    }

    getQueryId() {

    }
}

exports.ResultSet = ResultSet;