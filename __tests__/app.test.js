const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const NFT = require('../lib/models/Nfts');

async function createNft({ name, category, chain }) {
  const { rows } = await pool.query(
    'INSERT INTO nfts(name, category, chain) VALUES ($1, $2, $3) RETURNING *;',
    [name, category, chain]
  );
  return new NFT(rows[0]);
}

describe('AnyApi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a NFT', async () => {
    const expected = {
      name: 'BAYC',
      category: 'PFP',
      chain: 'Eth',
    };
    const res = await request(app).post('/api/v1/nfts').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
