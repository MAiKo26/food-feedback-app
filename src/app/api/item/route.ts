import sqlite3 from "sqlite3";
import {open, Database} from "sqlite";
import {NextRequest, NextResponse} from "next/server";
import mysql from "mysql2/promise";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db: any = null;

// Define the GET request handler function
export async function GET(req: NextRequest, res: NextResponse) {
  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    // db = await open({
    //   filename: "./zetafooddb.db", // Specify the database file path
    //   driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    // });
    db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "zetafooddb",
    });
  }

  // Perform a database query to retrieve all items from the "items" table
  // const items = await db.all("SELECT * FROM items ORDER BY score DESC");
  const items = await db.query(
    "SELECT MAX(id) AS id, MAX(name) AS name, suggestion, MAX(score) AS score FROM items GROUP BY suggestion;"
  );

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(items[0]), {
    headers: {"Content-Type": "application/json"},
    status: 200,
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Check if the database instance has been initialized
    if (!db) {
      // If the database instance is not initialized, open the database connection
      // db = await open({
      //   filename: "./zetafooddb.db", // Specify the database file path
      //   driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
      // });
      db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "zetafooddb",
      });
    }

    // Assuming the request body contains the data to be added to the database
    const requestData = await req.json();

    // Perform a database query to insert data into the "items" table
    const result = await db.query(
      "INSERT INTO Items(name, suggestion, score) VALUES(?, ?, ?)",
      [requestData.name, requestData.suggestion, requestData.score]

      // ... add other values corresponding to your table columns
    );

    // Check if the insertion was successful
    if (result.changedRows > 0) {
      // If successful, send a JSON response with the inserted data
      return new Response(
        JSON.stringify({success: "Data added successfully"}), // Corrected the body
        {headers: {"Content-Type": "application/json"}, status: 200}
      );
    } else {
      // If not successful, send a JSON response with an error message
      return new Response(
        JSON.stringify({error: "Failed to add data to the database"}),
        {headers: {"Content-Type": "application/json"}, status: 500}
      );
    }
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    return new Response(JSON.stringify({error: error}), {
      headers: {"Content-Type": "application/text"},
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    // Check if the database instance has been initialized
    if (!db) {
      // If the database instance is not initialized, open the database connection
      // db = await open({
      //   filename: "./zetafooddb.db", // Specify the database file path
      //   driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
      // });
      db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "zetafooddb",
      });
    }

    // Assuming the request body contains the data to be updated
    const requestData = await req.json();

    // Perform a database query to update the score of an item in the "Items" table
    const result = await db.query(
      "UPDATE Items SET score = ? WHERE id = ?;",
      [requestData.score, requestData.id]
      // Add other conditions or columns as needed
    );

    // Check if the update was successful
    if (result.changedRows > 0) {
      // If successful, send a JSON response with the updated data
      return new Response(
        JSON.stringify({success: "Data updated successfully"}),
        {headers: {"Content-Type": "application/json"}, status: 200}
      );
    } else {
      // If not successful, send a JSON response with an error message
      return new Response(
        JSON.stringify({error: "Failed to update data in the database"}),
        {headers: {"Content-Type": "application/json"}, status: 500}
      );
    }
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    return new Response(JSON.stringify({error: error}), {
      headers: {"Content-Type": "application/text"},
      status: 500,
    });
  }
}
