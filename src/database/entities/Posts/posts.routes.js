import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import { isSuperAdmin } from '../../middleware/isSuperAdmin.js'
import { createPost, deletePostByID, getAllPost, getPostByID, getOwnPost, updatePostById, likeById } from './posts.controller.js'

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePostByID)
router.put('/:id', auth, updatePostById)
router.get('/own', auth, getOwnPost)
router.get('/:id', getPostByID)
router.get('/', getAllPost)
router.put('/like/:id', auth, likeById)

export { router }