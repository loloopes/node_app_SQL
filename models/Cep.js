const connection = require('./connection');

const CEP_REGEX = /\d{5}-\d{3}/;

const formatCep = (cep) => {
  if (CEP_REGEX.test(cep)) return cep;

  return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
};

const getNewCep = ({ cep, logradouro, bairro, localidade, uf }) => ({
  cep: formatCep(cep),
  logradouro,
  bairro,
  localidade,
  uf,
});

const findAddressByCep = async (cepToSearch) => {
  // Removemos todos os traços, pois armazenamos o CEP
  // puro no banco
  const treatedCep = cepToSearch.replace('-', '');

  const query = 'SELECT cep, logradouro, bairro, localidade, uf FROM ceps WHERE cep = ?';

  const result = await connection.execute(query, [treatedCep])
    .then(([results]) => (results.length ? results[0] : null));

  if (!result) return null;

  return getNewCep(result);
};

const create = async ({ cep: rawCep, logradouro, bairro, localidade, uf }) => {
  // Removemos o traço do CEP para armazená-lo de forma limpa
  const cep = rawCep.replace(/-/ig, '');

  const query = 'INSERT INTO ceps (cep, logradouro, bairro, localidade, uf) VALUES (?, ?, ?, ?, ?)';

  // Executamos a query
  await connection.execute(query, [cep, logradouro, bairro, localidade, uf]);

  // Depois de inserir, retornamos os dados, como sinal de que foram guardados no banco
  return { cep, logradouro, bairro, localidade, uf };
};

module.exports = {
  findAddressByCep,
     create,
};