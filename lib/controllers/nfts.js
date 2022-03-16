const { Router } = require('express');
const NFT = require('../models/Nfts');

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
  })

  .get('/', async (req, res) => {
    const nfts = await NFT.findAll();
    res.send(nfts);
  })

  .patch('/:id', async (req, res) => {
    const nft = await NFT.updateById(req.params.id, req.body);
    res.send(nft);
  });
