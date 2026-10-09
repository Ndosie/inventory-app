const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function insertCategory({ name }) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
}

async function updateCategory({ name }, id) {
  await pool.query("UPDATE categories SET name=$1 WHERE id=$6", [name, id]);
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id=$1", [id]);
}

module.exports = {
  getAllCategories,
  insertCategory,
  updateCategory,
  deleteCategory,
};
