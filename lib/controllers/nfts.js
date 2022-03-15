const { Router } = require('express');
const NFT = require('../models/Nfts');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const nft = await NFT.insert(req.body);
  res.send(nft);
  //   const { rows } = await pool.query(
  //     'INSERT INTO nfts(name, category, chain) VALUES ($1, $2, $3) RETURNING *;',
  //     [req.body.name, req.body.category, req.body.chain]
  //   );
  //   const nft = new NFT(rows[0]);

  //   res.send(nft);
});
