import { Router } from 'express'
import { router as authRoutes } from './database/entities/Auth/auth.routes.js'
import { router as usersRoutes } from './database/entities/Users/users.routes.js'
import { router as postRoutes } from './database/entities/Post/post.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use ('/users', usersRoutes)
router.use ('/posts', postRoutes)

export { router } 