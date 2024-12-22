const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log('Headers recibidos:', req.headers); // Verifica que Authorization esté presente

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1]; // Extrae el token después de "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
        req.user = decoded; // Pasa los datos del token al controlador
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Token inválido' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ error: 'Token expirado' });
        }
        res.status(500).json({ error: 'Error interno al verificar el token' });
    }
};

module.exports = authenticateToken;
