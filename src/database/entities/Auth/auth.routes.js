import { Router } from 'express'

const router = Router()

router.post('/auth/register', register)

export { router }