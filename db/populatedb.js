#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  internal_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  id TEXT UNIQUE GENERATED ALWAYS AS (
    'CAT-' || LPAD(internal_id::TEXT, 4, '0')
  ) STORED,

  name VARCHAR (255) NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS units (
  internal_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  id TEXT UNIQUE GENERATED ALWAYS AS (
    'UNI-' || LPAD(internal_id::TEXT, 4, '0')
  ) STORED,

  name VARCHAR (255) NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS locations (
  internal_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  id TEXT UNIQUE GENERATED ALWAYS AS (
    'LOC-' || LPAD(internal_id::TEXT, 4, '0')
  ) STORED,

  name VARCHAR (255) NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS items (
  internal_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  id TEXT UNIQUE GENERATED ALWAYS AS (
    'ITM-' || LPAD(internal_id::TEXT, 5, '0')
  ) STORED,

  name VARCHAR (255) NOT NULL,
  photo_url TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  location JSON,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  CONSTRAINT fk_unit_id FOREIGN KEY (unit_id) REFERENCES units (id),
  CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES locations (id)
);

CREATE TABLE IF NOT EXISTS item_locs (
  item_id TEXT NOT NULL,
  location_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  CONSTRAINT fk_item_id FOREIGN KEY (item_id) REFERENCES items (id),
  CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES locations (id)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:''@localhost:5432/inventory",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
