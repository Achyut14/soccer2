// const { Query } = require('pg');
// const pool = require('../../config/db');

// // class User {
// //   static async create(username, email, password, firstName, lastName) {
// //     const query = 'INSERT INTO users(username, email, password, first_name, last_name) VALUES($1, $2, $3, $4, $5) RETURNING *';
// //     const values = [username, email, password, firstName, lastName];
// //     try {
// //       const { rows } = await pool.query(query, values);
// //       return rows[0];
// //     } catch (error) {
// //       throw error;
// //     }
// //   }

// //   static async findByEmail(email) {
// //     const query = 'SELECT * FROM users WHERE email = $1';
// //     const values = [email];
// //     try {
// //       const { rows } = await pool.query(query, values);
// //       return rows[0];
// //     } catch (error) {
// //       throw error;
// //     }
// //   }
// // }


// // module.exports = User;


// class User {
//   static async create(username, email, password, firstName, lastName) {
//     const query = 'INSERT INTO users(username, email, password, first_name, last_name) VALUES($1, $2, $3, $4, $5) RETURNING *';
//     const values = [username, email, password, firstName, lastName];
//     try {
//       const { rows } = await pool.query(query, values);
//       return rows[0];
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async findByEmail(email) {
//     const query = 'SELECT * FROM users WHERE email = $1';
//     const values = [email];
//     try {
//       const { rows } = await pool.query(query, values);
//       return rows[0];
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Method to check if a user exists by email or username
//   static async exists(email, username) {
//     const query = 'SELECT 1 FROM users WHERE email = $1 OR username = $2';
//     const values = [email, username];
//     try {
//       const { rows } = await pool.query(query, values);
//       return rows.length > 0;  // Returns true if user exists, false otherwise
//     } catch (error) {
//       console.error("Error in User.exists:", error.message, "Query:", query, "Values:". values);
//       throw error;
//     }
//   }

//   static async create(username, email, password) {
//     const query = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *';
//     const values = [username, email, password];
//     try {
//         const { rows } = await pool.query(query, values);
//         return rows[0];
//     } catch (error) {
//         console.error("Error in User.create:", error.message, "Query:", query, "Values:", values);
//         throw error;
//     }
// }

// }


// module.exports = User;


// const pool = require('../../config/db');

// class User {
//   static async create(username, email, password, firstName, lastName) {
//     const query = 'INSERT INTO users(username, email, password, first_name, last_name) VALUES($1, $2, $3, $4, $5) RETURNING *';
//     const values = [username, email, password, firstName, lastName];
//     try {
//       const { rows } = await pool.query(query, values);
//       return rows[0];
//     } catch (error) {
//       console.error("Error in User.create:", error.message, "Query:", query, "Values:", values);
//       throw error;
//     }
//   }

//   static async findByEmail(email) {
//     const query = 'SELECT * FROM users WHERE email = $1';
//     const values = [email];
//     try {
//       const { rows } = await pool.query(query, values);
//       return rows[0];
//     } catch (error) {
//       console.error("Error in User.findByEmail:", error.message, "Query:", query, "Values:", values);
//       throw error;
//     }
//   }

//   static async findByUsername(username) {
//     const query = 'SELECT * FROM users WHERE username = $1';
//     const values = [username];
//     try {
//       const { rows } = await pool.query(query, values);
//       return rows[0];
//     } catch (error) {
//       console.error("Error in User.findByUsername:", error.message, "Query:", query, "Values:", values);
//       throw error;
//     }
//   }

//   static async exists(email, username) {
//     const query = 'SELECT 1 FROM users WHERE email = $1 OR username = $2';
//     const values = [email, username];
//     try {
//       const { rows } = await pool.query(query, values);
//       return rows.length > 0;
//     } catch (error) {
//       console.error("Error in User.exists:", error.message, "Query:", query, "Values:", values);
//       throw error;
//     }
//   }
// }

// module.exports = User;

const pool = require('../../config/db');

class User {
  static async create(username, email, password, firstName, lastName) {
    const query = 'INSERT INTO users(username, email, password, first_name, last_name) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [username, email, password, firstName, lastName];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error in User.create:", error.message, "Query:", query, "Values:", values);
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error in User.findByEmail:", error.message, "Query:", query, "Values:", values);
      throw error;
    }
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error in User.findByUsername:", error.message, "Query:", query, "Values:", values);
      throw error;
    }
  }

  static async exists(email, username) {
    const query = 'SELECT 1 FROM users WHERE email = $1 OR username = $2';
    const values = [email, username];
    try {
      const { rows } = await pool.query(query, values);
      return rows.length > 0;
    } catch (error) {
      console.error("Error in User.exists:", error.message, "Query:", query, "Values:", values);
      throw error;
    }
  }
}

module.exports = User;
