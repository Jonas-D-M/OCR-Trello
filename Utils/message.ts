// import * as SQLite from 'expo-sqlite';
import {
  openDatabase,
  Database,
  SQLTransaction,
  Query,
  SQLResultSet,
  SQLError,
  SQLStatementErrorCallback,
} from "expo-sqlite";

export default (function () {
  const databaseName: string = "trello";

  // DB INIT
  const getDb = (name: string = databaseName): Database => {
    // Opent db als deze bestaat, maakt db aan als deze nog niet bestaat
    return openDatabase(name); // return SQLite.openDatabase(name);
  };
  // const tx = await _transaction(...);
  const transaction = (db: Database): Promise<SQLTransaction> => {
    return new Promise(function (resolve, reject) {
      db.transaction(
        (tx: SQLTransaction) => {
          resolve(tx);
          // callback(tx); // transactie meegeven aan de callback
        },
        (error) => {
          reject(error);
          console.error(error);
        },
        () => {
          console.info("Transaction succeeded");
        }
      );
    });
  };

  // TODO: make a promise
  const query = (tx: SQLTransaction, query: Query): Promise<SQLResultSet> => {
    return new Promise(function (resolve, reject) {
      tx.executeSql(
        query.sql,
        query.args,
        (tx: SQLTransaction, res: SQLResultSet) => {
          // Callback
          // console.log(tx, res);
          resolve(res);
        },
        (tx: SQLTransaction, error: SQLError): boolean => {
          // Error callback
          // console.log(tx, error);
          reject(error);
          return true;
        }
      );
    });
  };

  // TABLE INIT
  const initWritings = async () => {
    const db = getDb();
    // Promise: moeten we awaiten
    const tx = await transaction(db).catch((error) => console.error(error));

    if (tx) {
      const res = await query(tx, {
        sql:
          "CREATE TABLE IF NOT EXISTS 'writings' (id integer primary key autoincrement, title text, author text, note text)",
        args: [],
      });
    }
  };

  const writings = {
    // C reate
    create: (n: Note): Promise<SQLResultSet> => {
      return new Promise(async function (resolve, reject) {
        const db = getDb(),
          tx = await transaction(db);

        const res = await query(tx, {
          sql:
            "INSERT INTO 'writings' (id, title, author, note) values (?, ?, ?, ?)",
          args: [null, n.title, n.author, n.text],
        }).catch((error) => {
          reject(error);
        });

        if (res) resolve(res);
      });
    },

    // R ead
    read: {
      all: (): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
          const db = getDb(),
            tx = await transaction(db);

          const res = await query(tx, {
            sql: "SELECT * FROM 'writings'",
            args: [],
          }).catch((error) => {
            reject(error);
          });

          if (res) resolve(res);
        });
      },

      detail: (id: number): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
          const db = getDb(),
            tx = await transaction(db);

          const res = await query(tx, {
            sql: "SELECT * FROM 'writings' WHERE id = ?",
            args: [],
          }).catch((error) => {
            reject(error);
          });

          if (res) resolve(res);
        });
      },

      // U pdate
      update: (n: Note): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
          const db = getDb(),
            tx = await transaction(db);

          const res = await query(tx, {
            sql:
              "UPDATE 'writings' SET title = ?, author = ?, note = ? WHERE id = ?",
            args: [n.title, n.author, n.text, n.id],
          }).catch((error) => {
            reject(error);
          });

          if (res) resolve(res);
        });
      },

      // D elete
      delete: (id: number): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
          const db = getDb(),
            tx = await transaction(db);

          const res = await query(tx, {
            sql: "DELETE FROM 'writings' WHERE id = ?",
            args: [id],
          }).catch((error) => {
            reject(error);
          });

          if (res) resolve(res);
        });
      },
    },
  };

  return { writings, initWritings };
})();
