const { Router } = require('express');
const NFT = require('../models/Nfts');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const nft = await NFT.insert(req.body);
    res.send(nft);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const nft = await NFT.findById(req.params.id);
      res.send(nft);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
