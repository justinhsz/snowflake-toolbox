const { sdk } = require("snowflake-sdk");
const Statement = require("./statement");
const ResultSet = require("./resultset");

class Snowflake {

    /**
     * Constructor snowflake object to start.
     *
     * @param {Object} connectionInfo
     */
    constructor(connectionInfo) {
        this.connection = sdk.createConnection(connectionInfo);
    }

    /**
     * Create the statement based on the given query pattern.
     *
     * @param {Object} sql_command_object
     *
     * @returns {Statement}
     */
    createStatement(sql_command_object) {
        let statement = this.connection.execute(sql_command_object);
        return new Statement(statement);
    }

    /**
     * Create the statement based on the given query pattern.
     *
     * @param {Object} sql_command_object
     *
     * @returns {ResultSet}
     */
    execute(sql_command_object) {
        let statement = this.createStatement(sql_command_object);
        return statement.execute();
    }
}

exports.Snowflake = Snowflake;