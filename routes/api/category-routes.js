const router = require('express').Router();
const { Category, Product, ProductTag} = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    Category.findAll({ include: [Product] }).then(categories => res.status(200).json(categories));
});

router.get('/:id', (req, res) => {
    Category.findByPk(req.params.id, { include: [Product] }).then(category => res.status(200).json(category));
});

router.post('/', (req, res) => {
    Category.create(req.body).then(category=> res.status(200).json(category));
});

router.put('/:id', (req, res) => {
    Category.update(req.body, {
        where: {
            id: req.params.id,
        },
    }).then(category => res.status(200).json(category));
});

router.delete('/:id', (req, res) => {
  Category.destroy({ where: { id: req.params.id } }).then(category => res.status(200).json(category))
});

module.exports = router;
