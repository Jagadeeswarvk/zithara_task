const { pool } = require("../utils/db");

const getCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * 20;
  try {
    const result = await pool.query(
      `
        SELECT * FROM customers
        ORDER BY Sno
        LIMIT 20 OFFSET $1
      `,
      [offset]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchUser = async (req, res) => {
  const searchTerm = req.query.q;
  console.log(searchTerm);
  try {
    const result = await pool.query(
      `
        SELECT * FROM customers
        WHERE CustomerName ILIKE $1
        OR Location ILIKE $1
      `,
      [`%${searchTerm}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error searching customers:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//   const createCustomers = async(req,res) => {
//     const client = await pool.connect();
//     try {
//         pool
//           .query(
//             `
//   CREATE TABLE IF NOT EXISTS customers (
//     Sno SERIAL PRIMARY KEY,
//     CustomerName VARCHAR(50),
//     Age INT (3),
//     PhoneNo VARCHAR(15),
//     Location VARCHAR(100),
//     Created_At TIMESTAMP
//   )
// `
//           )
//           .then( async()=> {
//             // Populate customers table
//             console.log("here");
//             await client.query(`
//       INSERT INTO customers (CustomerName, Age, PhoneNo, Location,Created_At) VALUES
//   ('John Doe', 30, '123-456-7890', 'New York', '2024-03-03 09:00:00'),
//   ('Jane Smith', 25, '987-654-3210', 'Los Angeles', '2024-03-03 09:15:00'),
//   ('Alex Johnson', 40, '555-123-4567', 'Chicago', '2024-03-03 09:30:00'),
//   ('Sarah Brown', 35, '111-222-3333', 'Houston', '2024-03-03 09:45:00'),
//   ('Emily Davis', 28, '999-888-7777', 'Miami', '2024-03-03 10:00:00'),
//   ('Michael Lee', 45, '222-333-4444', 'Seattle', '2024-03-03 10:15:00'),
//   ('Jessica Wang', 32, '333-444-5555', 'San Francisco', '2024-03-03 10:30:00'),
//   ('David Chen', 27, '444-555-6666', 'Boston', '2024-03-03 10:45:00'),
//   ('Lisa Kim', 38, '777-888-9999', 'Atlanta', '2024-03-03 11:00:00'),
//   ('Ryan Garcia', 31, '666-555-4444', 'Dallas', '2024-03-03 11:15:00'),
//   ('Olivia Martinez', 29, '123-987-6543', 'Denver', '2024-03-03 11:30:00'),
//   ('Ethan Nguyen', 33, '987-654-3210', 'Philadelphia', '2024-03-03 11:45:00'),
//   ('Ava Hernandez', 24, '111-222-3333', 'Phoenix', '2024-03-03 12:00:00'),
//   ('Daniel Kim', 42, '555-444-3333', 'Detroit', '2024-03-03 12:15:00'),
//   ('Sophia Wu', 36, '777-666-5555', 'San Diego', '2024-03-03 12:30:00'),
//   ('Ethan Chen', 26, '999-888-7777', 'Washington D.C.', '2024-03-03 12:45:00'),
//   ('Mia Smith', 39, '888-777-6666', 'Austin', '2024-03-03 13:00:00'),
//   ('Benjamin Brown', 28, '444-555-6666', 'Nashville', '2024-03-03 13:15:00'),
//   ('Isabella Nguyen', 30, '333-222-1111', 'Portland', '2024-03-03 13:30:00'),
//   ('James Lee', 44, '222-333-4444', 'Las Vegas', '2024-03-03 13:45:00'),
//   ('Charlotte Martinez', 27, '111-222-3333', 'Orlando', '2024-03-03 14:00:00'),
//   ('Liam Johnson', 35, '555-666-7777', 'Minneapolis', '2024-03-03 14:15:00'),
//   ('Amelia Garcia', 32, '666-777-8888', 'Raleigh', '2024-03-03 14:30:00'),
//   ('Evelyn Wang', 37, '333-444-5555', 'Sacramento', '2024-03-03 14:45:00'),
//   ('Jackson Brown', 29, '777-888-9999', 'Charlotte', '2024-03-03 15:00:00'),
//   ('Harper Kim', 41, '123-456-7890', 'Indianapolis', '2024-03-03 15:15:00'),
//   ('Mateo Hernandez', 31, '555-666-7777', 'San Antonio', '2024-03-03 15:30:00'),
//   ('Evelyn Smith', 26, '888-999-0000', 'Tampa', '2024-03-03 15:45:00'),
//   ('Dylan Nguyen', 33, '777-888-9999', 'Salt Lake City', '2024-03-03 16:00:00'),
//   ('Zoey Taylor', 35, '666-555-4444', 'Honolulu', '2024-03-03 16:15:00'),
//   ('Sebastian Wang', 28, '555-444-3333', 'Kansas City', '2024-03-03 16:30:00'),
//   ('Victoria Brown', 39, '444-333-2222', 'Louisville', '2024-03-03 16:45:00'),
//   ('Leo Garcia', 24, '333-222-1111', 'Oklahoma City', '2024-03-03 17:00:00'),
//   ('Stella Davis', 37, '222-111-0000', 'Pittsburgh', '2024-03-03 17:15:00'),
//   ('Isaac Wilson', 30, '111-000-9999', 'Cincinnati', '2024-03-03 17:30:00'),
//   ('Naomi Martinez', 42, '777-888-9999', 'Memphis', '2024-03-03 17:45:00'),
//   ('Asher Johnson', 29, '888-777-6666', 'Milwaukee', '2024-03-03 18:00:00'),
//   ('Elena Hernandez', 36, '666-555-4444', 'Buffalo', '2024-03-03 18:15:00'),
//   ('Elias Nguyen', 31, '555-444-3333', 'Richmond', '2024-03-03 18:30:00'),
//   ('Penelope Wu', 25, '444-333-2222', 'Albuquerque', '2024-03-03 18:45:00'),
//   ('Mateo Smith', 33, '333-222-1111', 'Boise', '2024-03-03 19:00:00'),
//   ('Harper Kim', 38, '222-111-0000', 'Raleigh', '2024-03-03 19:15:00'),
//   ('Scarlett Davis', 27, '111-000-9999', 'Omaha', '2024-03-03 19:30:00'),
//   ('Julian Brown', 29, '999-888-7777', 'Cleveland', '2024-03-03 19:45:00'),
//   ('Elena Garcia', 34, '888-777-6666', 'Tacoma', '2024-03-03 20:00:00'),
//   ('Hudson Lee', 40, '777-666-5555', 'Wichita', '2024-03-03 20:15:00'),
//   ('Aurora Martinez', 26, '666-555-4444', 'Raleigh', '2024-03-03 20:30:00'),
//   ('Lincoln Johnson', 30, '555-444-3333', 'Madison', '2024-03-03 20:45:00'),
//   ('Paisley Smith', 35, '444-333-2222', 'Baton Rouge', '2024-03-03 21:00:00'),
//   ('Diego Nguyen', 28, '333-222-1111', 'Birmingham', '2024-03-03 21:15:00');

// //       `);
//           })
//           .catch((err) => {
//             console.error("Error creating customers table:", err);
//           });
//       // Insert new records into the customers table

//     } catch (err) {
//       console.error('Error creating customers:', err);
//     } finally {
//       client.release();
//     }
//   }

const createCustomers = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query(`
            CREATE TABLE IF NOT EXISTS customers (
                Sno SERIAL PRIMARY KEY,
                CustomerName VARCHAR(50),
                Age INT,
                PhoneNo VARCHAR(15),
                Location VARCHAR(100),
                Created_At TIMESTAMP
            )
        `);

    await client.query(`
            INSERT INTO customers (CustomerName, Age, PhoneNo, Location, Created_At) VALUES
                ('Emily Davis', 28, '999-888-7777', 'Miami', '2024-03-03 10:00:00'),
  ('Michael Lee', 45, '222-333-4444', 'Seattle', '2024-03-03 10:15:00'),
  ('Jessica Wang', 32, '333-444-5555', 'San Francisco', '2024-03-03 10:30:00'),
  ('David Chen', 27, '444-555-6666', 'Boston', '2024-03-03 10:45:00'),
  ('Lisa Kim', 38, '777-888-9999', 'Atlanta', '2024-03-03 11:00:00'),
  ('Ryan Garcia', 31, '666-555-4444', 'Dallas', '2024-03-03 11:15:00'),
  ('Olivia Martinez', 29, '123-987-6543', 'Denver', '2024-03-03 11:30:00'),
  ('Ethan Nguyen', 33, '987-654-3210', 'Philadelphia', '2024-03-03 11:45:00'),
  ('Ava Hernandez', 24, '111-222-3333', 'Phoenix', '2024-03-03 12:00:00'),
  ('Daniel Kim', 42, '555-444-3333', 'Detroit', '2024-03-03 12:15:00'),
  ('Sophia Wu', 36, '777-666-5555', 'San Diego', '2024-03-03 12:30:00'),
  ('Ethan Chen', 26, '999-888-7777', 'Washington D.C.', '2024-03-03 12:45:00'),
  ('Mia Smith', 39, '888-777-6666', 'Austin', '2024-03-03 13:00:00'),
  ('Benjamin Brown', 28, '444-555-6666', 'Nashville', '2024-03-03 13:15:00'),
  ('Isabella Nguyen', 30, '333-222-1111', 'Portland', '2024-03-03 13:30:00'),
  ('James Lee', 44, '222-333-4444', 'Las Vegas', '2024-03-03 13:45:00'),
  ('Charlotte Martinez', 27, '111-222-3333', 'Orlando', '2024-03-03 14:00:00'),
  ('Liam Johnson', 35, '555-666-7777', 'Minneapolis', '2024-03-03 14:15:00'),
  ('Amelia Garcia', 32, '666-777-8888', 'Raleigh', '2024-03-03 14:30:00'),
  ('Evelyn Wang', 37, '333-444-5555', 'Sacramento', '2024-03-03 14:45:00'),
  ('Jackson Brown', 29, '777-888-9999', 'Charlotte', '2024-03-03 15:00:00'),
  ('Harper Kim', 41, '123-456-7890', 'Indianapolis', '2024-03-03 15:15:00'),
  ('Mateo Hernandez', 31, '555-666-7777', 'San Antonio', '2024-03-03 15:30:00'),
  ('Evelyn Smith', 26, '888-999-0000', 'Tampa', '2024-03-03 15:45:00'),
  ('Dylan Nguyen', 33, '777-888-9999', 'Salt Lake City', '2024-03-03 16:00:00'),
  ('Zoey Taylor', 35, '666-555-4444', 'Honolulu', '2024-03-03 16:15:00'),
  ('Sebastian Wang', 28, '555-444-3333', 'Kansas City', '2024-03-03 16:30:00'),
  ('Victoria Brown', 39, '444-333-2222', 'Louisville', '2024-03-03 16:45:00'),
  ('Leo Garcia', 24, '333-222-1111', 'Oklahoma City', '2024-03-03 17:00:00'),
  ('Stella Davis', 37, '222-111-0000', 'Pittsburgh', '2024-03-03 17:15:00'),
  ('Isaac Wilson', 30, '111-000-9999', 'Cincinnati', '2024-03-03 17:30:00'),
  ('Naomi Martinez', 42, '777-888-9999', 'Memphis', '2024-03-03 17:45:00'),
  ('Asher Johnson', 29, '888-777-6666', 'Milwaukee', '2024-03-03 18:00:00'),
  ('Elena Hernandez', 36, '666-555-4444', 'Buffalo', '2024-03-03 18:15:00'),
  ('Elias Nguyen', 31, '555-444-3333', 'Richmond', '2024-03-03 18:30:00'),
  ('Penelope Wu', 25, '444-333-2222', 'Albuquerque', '2024-03-03 18:45:00'),
  ('Mateo Smith', 33, '333-222-1111', 'Boise', '2024-03-03 19:00:00'),
  ('Harper Kim', 38, '222-111-0000', 'Raleigh', '2024-03-03 19:15:00'),
  ('Scarlett Davis', 27, '111-000-9999', 'Omaha', '2024-03-03 19:30:00'),
  ('Julian Brown', 29, '999-888-7777', 'Cleveland', '2024-03-03 19:45:00'),
  ('Elena Garcia', 34, '888-777-6666', 'Tacoma', '2024-03-03 20:00:00'),
  ('Hudson Lee', 40, '777-666-5555', 'Wichita', '2024-03-03 20:15:00'),
  ('Aurora Martinez', 26, '666-555-4444', 'Raleigh', '2024-03-03 20:30:00'),
  ('Lincoln Johnson', 30, '555-444-3333', 'Madison', '2024-03-03 20:45:00'),
  ('Paisley Smith', 35, '444-333-2222', 'Baton Rouge', '2024-03-03 21:00:00'),
  ('Diego Nguyen', 28, '333-222-1111', 'Birmingham', '2024-03-03 21:15:00');
        `);

    console.log("Customers table created and populated successfully");
    res.send("Customers table created and populated successfully");
  } catch (err) {
    console.error("Error creating customers:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    client.release();
  }
};
module.exports = { getCustomers, searchUser, createCustomers };
