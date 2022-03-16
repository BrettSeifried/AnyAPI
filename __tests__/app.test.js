const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const NFT = require('../lib/models/Nfts');

const data = {
  name: 'BAYC',
  category: 'PFP',
  chain: 'Eth',
};

// async function createNft({ name, category, chain }) {
//   const { rows } = await pool.query(
//     'INSERT INTO nfts(name, category, chain) VALUES ($1, $2, $3) RETURNING *;',
//     [name, category, chain]
//   );
//   return new NFT(rows[0]);
// }

describe('AnyApi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a NFT', async () => {
    const res = await request(app).post('/api/v1/nfts').send(data);

    expect(res.body).toEqual({ id: expect.any(String), ...data });
  });

  it('Reads an NFT by id', async () => {
    const nft = await NFT.insert(data);
    const res = await request(app).get(`/api/v1/nfts/${nft.id}`);

    expect(res.body).toEqual(nft);
  });

  it('gets a list of NFTs', async () => {
    const expected = await NFT.findAll();
    const res = await request(app).get('/api/v1/nfts');

    expect(res.body).toEqual(expected);
  });

  it('Update by ID', async () => {
    const expected = {
      id: expect.any(String),
      name: 'BAYC',
      category: 'Ecosystem',
      chain: 'Eth',
    };
    const resp = await request(app)
      .patch('/api/v1/nfts/1')
      .send({ category: 'Ecosystem' });
    expect(resp.body).toEqual(expected);
  });

  it('Deletes an NFT from the db', async () => {
    const expected = await NFT.findById(1);
    const res = await request(app).delete(`/api/v1/nfts/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
