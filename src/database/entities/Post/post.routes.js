import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import { isSuperAdmin } from '../../middleware/isSuperAdmin.js'

const router = Router()

router.post('/', auth, createPost)

export { router }