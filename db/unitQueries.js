const pool = require("./pool");

async function getAllUnits() {
  const { rows } = await pool.query("SELECT * FROM units");
  return rows;
}

async function insertUnit({ name }) {
  await pool.query("INSERT INTO units (name) VALUES ($1)", [name]);
}

async function updateUnit({ name }, id) {
  await pool.query("UPDATE units SET name=$1 WHERE id=$6", [name, id]);
}

async function deleteUnit(id) {
  await pool.query("DELETE FROM units WHERE id=$1", [id]);
}

module.exports = {
  getAllUnits,
  insertUnit,
  updateUnit,
  deleteUnit,
};
