import { Router } from 'express'
import { router as authRoutes } from './database/entities/Auth/auth.routes.js'

const router = Router()

router.use('/auth', authRoutes)

export { router } 