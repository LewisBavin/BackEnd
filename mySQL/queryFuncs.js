function addUser(name, email, password) {
  return `INSERT INTO users
                (id, name, email, password)
                    VALUES
                      (null, "${name}", "${email}", "${password}");`;
}

function getUser(token) {
  return `SELECT *
                FROM users
                    JOIN sessions ON users.id = sessions.user_id
                        WHERE token LIKE "${token}";`;
}

function getTradingData(token, table){
  return `SELECT * 
            FROM ${table} 
              JOIN ${table} ON ${table}.user_id = sessions.user_id`
}

function updateUser(key, value, token) {
  return `UPDATE users
                    JOIN sessions ON users.id = sessions.user_id
                        SET ${key} = "${value}"
                            WHERE sessions.token LIKE "${token}";`;
}

function deleteAll(table, key, val) {
  return `DELETE FROM ${table}
            WHERE ${key} LIKE ${val};`;
}

function addSessionToken(userId, token) {
  return `INSERT INTO sessions
              (user_id, token)
                   VALUES
                      (${userId}, "${token}");`;
}

function checkSessionToken(token) {
  return `SELECT users.id
                  FROM users
                      JOIN sessions ON users.id = sessions.user_id
                          WHERE token LIKE "${token}";`;
}

function deleteSessionToken(token) {
  return `DELETE FROM sessions
                      WHERE token LIKE "${token}";`;
}

function authEmailPassowrd() {
  return `SELECT *  FROM users
            WHERE email LIKE ?
                AND password LIKE?;`;
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  addSessionToken,
  checkSessionToken,
  deleteSessionToken,
  deleteAll,
  authEmailPassowrd,
};
