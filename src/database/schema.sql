CREATE DATABASE evento;

\c evento;

CREATE TABLE ingresso (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    local_evento VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

INSERT INTO ingresso (evento, data_evento, local_evento, categoria, preco, quantidade_disponivel) 
VALUES 
('Show de Jorge e Matheus', '2025-09-19', 'Allianz Parque', 'Pista', 500.00, 1000),
('Show de rock', '2025-05-20', 'Allianz Parque', 'Cadeira', 800.00, 500),
('Show da Anitta', '2025-06-10', 'Allianz Parque', 'Camarote', 1500.00, 200);