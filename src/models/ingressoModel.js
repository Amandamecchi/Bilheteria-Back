const pool = require('../config/database');

const getAllngressos = async (evento) => {
    try {
        if (!evento) {
            
            const resultado = await pool.query('SELECT * FROM ingressos');
            return resultado.rows;
        }else {
            const resultado = await pool.query('SELECT * FROM ingressos WHERE evento = $1', [`%${evento}%`]);
            return resultado.rows;
        }
    } catch (error) {
        console.error('Erro ao buscar ingressos:', error);
        throw error;
    }
};

const getIngressoById = async (req, res) => {
    const resultado = await pool.query('SELECT * FROM ingressos WHERE id = $1', [id]);
    return resultado.rows[0];
};

const createIngresso = async (evento, localizacao, data_evento, categoria, preco, quantidade_disponivel) => {
try {
        if (categoria === "inteira" && preco < 200) {
            return { error: 'Preço inválido para categoria inteira' };
        }else if (categoria === "meia" && preco > 200) {
            return { error: 'Preço inválido para categoria meia' };
        }else if (categoria === "camarote" && preco < 400) {
            return { error: 'Preço inválido para categoria camarote' };
        }else if (categoria === "pista" && preco > 90) {
            return { error: 'Preço inválido para categoria pista' };
        }

        const resultado = await pool.query('INSERT INTO ingressos (evento, local_evento, data_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [evento, localizacao, data_evento, categoria, preco, quantidade_disponivel]);
        return resultado.rows[0];
} catch (error) {
        console.error('Erro ao criar ingresso:', error);
        throw error;
    }
};

const updateIngresso = async (id, evento, localizacao, data_evento, categoria, preco, quantidade_disponivel) => {
    const resultado = await pool.query('UPDATE ingressos SET evento = $1, localizacao = $2, data_evento = $3, categoria = $4, preco = $5, quantidade_disponivel = $6 WHERE id = $7 RETURNING *', [evento, localizacao, data_evento, categoria, preco, quantidade_disponivel, id]);
    return resultado.rows[0];
};

const deleteIngresso = async (id) => {
    const resultado = await pool.query('DELETE FROM ingressos WHERE id = $1 RETURNING *', [id]);
if 
(!resultado.rowCont == 0) {
        return { message: 'Ingresso não encontrado' };
    }
    return { message: 'Ingresso deletado com sucesso' };
};

const createVenda = async (id_ingresso, quantidade) => {
    const resultado = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id_ingresso]);
    const item = resultado.rows[0];
    const quantidade_disponivel = item.quantidade_disponivel - quantidade;
   
    await pool.query('UPDATE ingressos SET quantidade_disponivel = $1 WHERE id = $2', [quantidade_disponivel, id_ingresso]);
    
    return {
        message: 'Compra realizada com sucesso',
        ingresso: item.evento,
        quantidade_vendida: quantidade,
        quantidade_disponivel: quantidade_disponivel
    };
};
module.exports = { getAllngressos, getIngressoById, createIngresso, updateIngresso, deleteIngresso, createVenda };
