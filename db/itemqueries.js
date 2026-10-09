const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function insertItem({ name, photo_url, unit_id, category_id, quantity }) {
  await pool.query(
    "INSERT INTO items (name, photo_url, unit_id, category_id, quantity) VALUES ($1, $2, $3, $4, $5)",
    [name, photo_url, unit_id, category_id, quantity],
  );
}

async function updateItem(
  { name, photo_url, unit_id, category_id, quantity },
  id,
  isAdding = false,
) {
  let newQty = 0;
  const oldQty = await pool.query("SELECT * FROM items WHERE id=$1", [id]);
  if (isAdding) {
    newQty = oldQty + quantity;
  } else {
    newQty = oldQty;
  }
  await pool.query(
    "UPDATE items SET name=$1, photo_url=$2, unit_id=$3, category_id=$4, quantity=$5 WHERE id=$6",
    [name, photo_url, unit_id, category_id, newQty, id],
  );
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id=$1", [id]);
}

async function getItem(id) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id=$1", [id]);
  return rows[0];
}

async function trackItem({ item_id, location_id, quantity }) {
  await pool.query(
    "INSERT INTO item_locs (item_id, location_id, quantity) VALUES ($1, $2)",
    [item_id, location_id, quantity],
  );
}

async function getItemByLocation(location_id) {
  const { rows } = await pool.query(
    "SELECT * FROM items JOIN locations ON items.id=item_locs.item_id WHERE location_id=$1",
    [location_id],
  );
  return rows;
}

async function getItemByCategory(category_id) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id=$1",
    [category_id],
  );
  return rows;
}

module.exports = {
  getAllItems,
  insertItem,
  updateItem,
  deleteItem,
  getItem,
  trackItem,
  getItemByLocation,
  getItemByCategory,
};
