const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  const result = await Category.findAll({
    include: [Product]
  })
  // be sure to include its associated Products
  res.json(result);
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  const result = await Category.findOne({
    where: {id: req.params.id},
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name']
      }
    ]
  })
  if(result) {
    res.json(result);
  } else {
    res.status(500);
    res.json({message: 'Category not found.'});
  }
});

router.post('/', async(req, res) => {
  // create a new category
  const result = await Category.create(req.body);
  res.json({message: `Category created`});
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  const result = await Category.update(req.body, {where: {id: req.params.id}});
  res.json({message: `Category updated with id: ${req.params.id} and category name: ${req.body.category_name}`})
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  const result = await Category.destroy({
    where: {id: req.params.id}
  })
  res.status(200);
  res.json({message: `Deleted Category with id: ${req.params.id}`});
});

module.exports = router;
