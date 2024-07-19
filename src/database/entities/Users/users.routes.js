import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import { isSuperAdmin } from '../../middleware/isSuperAdmin.js'
import { getAllUsers, getUserProfile, updateUserProfile } from './users.controller.js'

const router = Router()

router.get('/', auth, isSuperAdmin, getAllUsers)
router.get('/profile', auth, getUserProfile)
router.put('/profile', auth, updateUserProfile)

export { router }