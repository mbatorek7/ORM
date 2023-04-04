const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  const result = await Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name']
      }
    ]
  })
  res.json(result);
});

router.get('/:id', async(req, res) => {
  const result = await Tag.findOne({
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
    res.json({message: 'Tag not found.'});
  }
});

router.post('/', async(req, res) => {
  const result = await Tag.create(req.body);
  res.json({message: `Tag created`});
});

router.put('/:id', async(req, res) => {
  const result = await Tag.update(req.body, {where: {id: req.params.id}});
  res.json({message: `Tag updated with id: ${req.params.id} and tag name: ${req.body.tag_name}`})
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  const result = await Tag.destroy({
    where: {id: req.params.id}
  })
  res.status(200);
  res.json({message: `Deleted Tag with id: ${req.params.id}`});
});

module.exports = router;
