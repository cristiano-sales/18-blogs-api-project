const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

module.exports = {
  createPostAndCategory: async ({ title, content, categoryIds }, userId) => {
    try {
      const result = await sequelize.transaction(async (t) => {
        const post = await BlogPost.create({
          title,
          content,
          userId,
        }, { transaction: t });

        const promisses = [];

        for (let index = 0; index < categoryIds.length; index += 1) {
          promisses.push(PostCategory.create({
            postId: post.dataValues.id,
            categoryId: categoryIds[index],
          }, { transaction: t }));
        } 
        await Promise.all(promisses);
        return post.dataValues.id;
      }); return result;
    } catch (error) { return false; }
  },
  findById: async (id) => 
    BlogPost.findOne({ where: { id } }),
  findByEmail: async (email) =>
    BlogPost.findOne({ where: { email } }),
  getPosts: () => 
      BlogPost.findAll({
       include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
    }),
    getPostsById: (id) =>
      BlogPost.findOne({
        where: { id },
        include: [{
         model: User,
         as: 'user',
         attributes: ['id', 'displayName', 'email', 'image'],
       },
       {
         model: Category,
         as: 'categories',
       },
     ],
     }),
     putPost: (id, { title, content }) =>
       BlogPost.update({ title, content }, { where: { id } }),
     deletePost: (id) =>
       BlogPost.destroy({
         where: { id },
       }),
     getBySearchParams: (searchParams) => 
        BlogPost.findAll({
            where: {
              [Sequelize.Op.or]: [
                { title: {
                  [Sequelize.Op.like]: `%${searchParams}%`,
                } },
                { content: {
                  [Sequelize.Op.like]: `%${searchParams}%`,
                } },
              ],
            },
            include: [{
              model: User,
              as: 'user',
              attributes: ['id', 'displayName', 'email', 'image'],
            },
            { model: Category, as: 'categories' },
          ],
       }),
};
