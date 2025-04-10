const ingressoModel = require('../models/ingressoModel');

const getAllngressos = async (req, res) => {
    try {
       const { evento } = req.query;
       const ingressos = await ingressoModel.find({ evento }); 
       res.json(ingressos);  
    } catch (error) {
        res.status(404).json({ message: 'Erro ao buscar ingressos' });
    }
};

const getIngressoById = async (req, res) => {
    try {
        const ingresso = await ingressoModel.findById(req.params.id);
        if (!ingresso) {
            return res.status(404).json({ message: 'Ingresso não encontrado' });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ingresso' });
    }
};

const createIngresso = async (req, res) => {
    try {
        const {evento, localizacao, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        if (!evento || !localizacao || !data_evento || !categoria || !preco || !quantidade_disponivel) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        const criado = await ingressoModel.create({ evento, localizacao, data_evento, categoria, preco, quantidade_disponivel });
        res.status(201).json(criado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar ingresso' });
    }
};

const updateIngresso = async (req, res) => {
    try {
      const { evento, localizacao, data_evento, categoria, preco, quantidade_disponivel } = req.body;
      const atualizado = await ingressoModel.updateIngresso(req.params.id,  evento, localizacao, data_evento, categoria, preco, quantidade_disponivel );
      if (!atualizado) {
          return res.status(404).json({ message: 'Ingresso não encontrado' });
      }
      res.json(atualizado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar ingresso' });
    }
};

const deleteIngresso = async (req, res) => {
    try {
        const retorno = await ingressoModel.deleteIngresso(req.params.id);
        res.json(retorno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar ingresso' });
    }
};

const createVenda = async (req, res) => {
    try {
      const { id, quantidade } = req.body;
      if (!id || !quantidade <= 0) {
          return res.status(400).json({ message: 'quantidade invalida' });
      }
      const ingresso = await ingressoModel.findById(id);
      if (!ingresso) {
          return res.status(404).json({ message: 'Ingresso não encontrado' });
      }
      if (ingresso.quantidade_disponivel < quantidade) {
          return res.status(400).json({ message: 'Quantidade indisponível' });
      }
      ingresso.quantidade_disponivel -= quantidade;
      if (ingresso.quantidade_disponivel < 0) {
        ingresso.quantidade_disponivel = 0;
      }
      await ingressoModel.updateIngresso(ingresso.id, ingresso.evento, ingresso.localizacao, ingresso.categoria, ingresso.preco, ingresso.quantidade_disponivel);
      const newVenda = await ingressoModel.createVenda(req.params.id, quantidade);
      res.status(201).json(newVenda);

    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar venda' });
    }
};

module.exports = { getAllngressos, getIngressoById, createIngresso, updateIngresso, deleteIngresso, createVenda };