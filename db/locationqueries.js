const pool = require("./pool");

async function getAllLocations() {
  const { rows } = await pool.query("SELECT * FROM locations");
  return rows;
}

async function insertLocation({ name }) {
  await pool.query("INSERT INTO items (name) VALUES ($1)", [name]);
}

async function updateLocation({ name }, id) {
  await pool.query("UPDATE items SET name=$1 WHERE id=$6", [name, id]);
}

async function deleteLocation(id) {
  await pool.query("DELETE FROM location WHERE id=$1", [id]);
}

module.exports = {
  getAllLocations,
  insertLocation,
  updateLocation,
  deleteLocation,
};
