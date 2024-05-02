const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Um banco de dados fictício de usuários
const usersDB = [
    { id: 1, email: 'teste@exemplo.com', passwordHash: '$2b$10$ZkUShuIFZhqUQKRHn4RseuN.' },
];

// Endpoint para autenticação de usuário
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    // Encontrar usuário com base no e-mail
    const user = usersDB.find(user => user.email === email);

    if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    // Verificar se a senha está correta
    const passwordMatch = await bcrypt.compare(senha, user.passwordHash);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.id }, 'seu_segredo', { expiresIn: '1h' });

    // Enviar token ao cliente
    res.json({ token });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
