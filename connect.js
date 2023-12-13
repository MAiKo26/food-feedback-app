const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./zetafooddb.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the Postuler table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS Items (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT,
        suggestion TEXT,
        score INTEGER
      )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created Items table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM Items`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from Items");

        // Insert new data into the products table
        const values1 = ["John Doe", "مقرونة", 0];
        const values2 = ["John Dan", "Chorba", 0];

        const insertSql = `INSERT INTO Items(name, suggestion, score) VALUES(?, ?, ?)`;

        db.run(insertSql, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        db.run(insertSql, values2, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        //   Close the database connection after all insertions are done
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Closed the database connection.");
        });
      });
    }
  );
});
