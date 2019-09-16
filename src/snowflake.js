const sdk = require("snowflake-sdk");
const Statement = require("./statement");

class snowflake {
    constructor(connectionInfo) {
        this.connection = sdk.createConnection(connectionInfo);
    }

    createStatement(sql_command_object) {
        let statement = this.connection.execute(sql_command_object);
        return new Statement(statement);
    }

    execute(sql_command_object) {
        let statement = this.createStatement(sql_command_object);
        return statement.execute();
    }
}

exports.snowflake = snowflake;