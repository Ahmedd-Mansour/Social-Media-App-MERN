const express = require('express')
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  getUserPosts,
  likePost,
  unlikePost
} = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)
router.get('/', getPosts)
router.put('/:id/like',likePost)
router.put('/:id/unlike',unlikePost)
router.post('/create', createPost)
router.get('/profile',getUserPosts)
router.delete('/:id', deletePost)

router.patch('/:id', updatePost)


module.exports = router