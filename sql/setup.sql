-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS nfts;

CREATE TABLE nfts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    chain TEXT NOT NULL
);

-- INSERT INTO
--     nfts (name, category, chain)
-- VALUES
--     ('BAYC', 'PFP', 'Eth'),
--     ('CryptoPunks', 'PFP', 'Eth');