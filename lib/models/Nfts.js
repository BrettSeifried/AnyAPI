const pool = require('../utils/pool');

module.exports = class NFT {
  id;
  name;
  category;
  chain;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.category = row.category;
    this.chain = row.chain;
  }
  static async insert({ name, category, chain }) {
    const { rows } = await pool.query(
      `INSERT INTO 
        nfts(name, category, chain) 
    VALUES 
        ($1, $2, $3) 
    RETURNING 
    *`,
      [name, category, chain]
    );
    return new NFT(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
          *
        FROM
          nfts
        WHERE
          id=$1
        `,
      [id]
    );
    return new NFT(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `SELECT
            *
        FROM
            nfts
            `
    );
    return rows.map((row) => new NFT(row));
  }
};
