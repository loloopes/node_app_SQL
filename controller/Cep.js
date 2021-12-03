const service = require('../services/Cep');
const Joi = require('joi');

const findAddressByCep = async (req, res, next) => {
  const { cep } = req.params;

  const address = await service.findAddressByCep(cep);
  if (address.error) return next(address.error);

  return res.status(200).json(address);
};

const create = async (req, res, next) => {
  const { error } = Joi.object({
    cep: Joi.string().regex(/\d{5}-\d{3}/).required(),
    logradouro: Joi.string().required(),
    bairro: Joi.string().required(),
    localidade: Joi.string().required(),
    uf: Joi.string().length(2).required(),
  }).validate(req.body);

  if (error) return next(error)

  const newCep = await service.create(req.body);

  if (newCep.error) return next(newCep.error)

  return res.status(201).json(newCep)
}

module.exports = {
  findAddressByCep, create
}