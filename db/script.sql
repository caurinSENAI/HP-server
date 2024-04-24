CREATE DATABASE hpexerc;

\c hpexerc;

CREATE TABLE bruxo (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  idade INT NOT NULL,
  casa VARCHAR(255) NOT NULL,
  habilidade VARCHAR(255) NOT NULL,
  sangue VARCHAR(255) NOT NULL,
  patrono VARCHAR(255) 
);

CREATE TABLE varinha (
  id SERIAL PRIMARY KEY,
  material VARCHAR(255) NOT NULL,
  comprimento INT NOT NULL,
  nucleo VARCHAR(255) NOT NULL,
  data_fabric INT NOT NULL
);