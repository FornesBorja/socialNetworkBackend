import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import { isSuperAdmin } from '../../middleware/isSuperAdmin.js'
import { followById, getAllUsers, getUserProfile, updateUserProfile } from './users.controller.js'
import { getPostByUserID } from '../Posts/posts.controller.js'

const router = Router()

router.get('/', auth, isSuperAdmin, getAllUsers)
router.get('/', auth, isSuperAdmin, getAllUsers)
router.get('/profile', auth, getUserProfile)
router.put('/profile', auth, updateUserProfile)
router.get('/posts/:userId', getPostByUserID);
router.get('/follow/:userId', followById);


export { router }