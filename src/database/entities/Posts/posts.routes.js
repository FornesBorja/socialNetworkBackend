import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import { isSuperAdmin } from '../../middleware/isSuperAdmin.js'
import { createPost, deletePostByID, getAllPost, getOwnPost, updatePostById } from './posts.controller.js'

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePostByID)
router.put('/:id', auth, updatePostById)
router.get('/own', auth, getOwnPost)
router.get('/', getAllPost)

export { router }