const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function insertItem({ name, photo_url, unit_id, category_id, location }) {
  await pool.query(
    "INSERT INTO items (name, photo_url, unit_id, category_id, location) VALUES ($1, $2, $3, $4, $5)",
    [name, photo_url, unit_id, category_id, location],
  );
}

async function updateItem(
  { name, photo_url, unit_id, category_id, location },
  id,
) {
  await pool.query(
    "UPDATE items SET name=$1, photo_url=$2, unit_id=$3, category_id=$4, location=$5 WHERE id=$6",
    [name, photo_url, unit_id, category_id, location, id],
  );
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id=$1", [id]);
}

async function getItem(id) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id=$1", [id]);
  return rows[0];
}

module.exports = { getAllItems, insertItem, updateItem, deleteItem, getItem };
