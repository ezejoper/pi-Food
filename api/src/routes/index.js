const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const recipesRoute= require('./reciperoute');
const diettypeRoute = require('./dietroute');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes',recipesRoute )
router.use('/diets',diettypeRoute )

module.exports = router;
