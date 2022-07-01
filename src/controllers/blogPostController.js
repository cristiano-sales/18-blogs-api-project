const blogpostRouter = require('express').Router();
const blogpostService = require('../services/blogPostService');
const userService = require('../services/userService');
const middlewares = require('../middlewares');

blogpostRouter.get('/search', async (req, res) => {
  const { q: searchParams } = req.query;
  if (!searchParams) return res.status(200).json(await blogpostService.getPosts());

  const posts = await blogpostService.getBySearchParams(searchParams);
  return res.status(200).json(posts);
});

blogpostRouter.post('/', middlewares.validatePostData, async (req, res) => {
  const { user: { email: loggedUserEmail } } = res.locals;
  const { dataValues: { id: userId } } = await userService.getUserByEmail(loggedUserEmail);

  const result = await blogpostService.createPostAndCategory(req.body, userId);
  if (!result) return res.status(400).json({ message: '"categoryIds" not found' });

  return res.status(201).json(await blogpostService.findById(result));
});

blogpostRouter.get('/', async (req, res) => {
  const posts = await blogpostService.getPosts();
  return res.status(200).json(posts);
});

blogpostRouter.get('/:id', async (req, res) => {
  const post = await blogpostService.getPostsById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(post);
});

blogpostRouter.put('/:id', middlewares.validatePutData, async (req, res) => {
  const { user: { email: loggedUserEmail } } = res.locals;
  const { id: postId } = req.params;

  const { dataValues: { user } } = await blogpostService.getPostsById(postId);
  const postOwnerEmail = user.dataValues.email;

  if (loggedUserEmail !== postOwnerEmail) {
     return res.status(401).json({ message: 'Unauthorized user' }); 
}

  const [updated] = await blogpostService.putPost(postId, req.body);
  if (updated > 0) {
    const updatedPost = await blogpostService.getPostsById(postId);
    return res.status(200).json(updatedPost);
  }

  return res.status(400).json({ message: 'Error: Post not updated' });
});

blogpostRouter.delete('/:id', async (req, res) => {
  const { user: { email: loggedUserEmail } } = res.locals;
  const { id: postId } = req.params;

  const postAssociate = await blogpostService.getPostsById(postId);
  if (!postAssociate) {
    res.status(404).json({ message: 'Post does not exist' });
  }
  const postOwnerEmail = postAssociate.dataValues.user.dataValues.email;

  if (loggedUserEmail !== postOwnerEmail) {
     return res.status(401).json({ message: 'Unauthorized user' }); 
 }

 const deleted = await blogpostService.deletePost(postId);
  if (deleted > 0) return res.status(204).end();

 return res.status(400).json({ message: 'Error: Post not deleted' });
});

module.exports = blogpostRouter;
