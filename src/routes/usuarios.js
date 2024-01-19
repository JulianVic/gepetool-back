
import { Router } from 'express'
import usuariosController from '../controllers/usuarios.js'

const router = Router()

router.get('/', usuariosController.getusuarios)

export default router
