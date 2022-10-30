import { SqlControllerProps } from "db-api";

// CREATE
export const onCreateTable = ({
  transaction,
  table,
}: SqlControllerProps<null>) =>
  transaction.executeSql(`
  CREATE TABLE IF NOT EXISTS 
    ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT)
`);

// READ

// UPDATE

// DELETE
export const onDropTable = ({ transaction, table }: SqlControllerProps<null>) =>
  transaction.executeSql(`DROP TABLE IF EXISTS ${table}`);
