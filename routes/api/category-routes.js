const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    Category.findAll({ include: [Product] })
        .then(categories => res.status(200).json(categories))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Category.findByPk(req.params.id, { include: [Product] })
        .then(category => res.status(200).json(category))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Category.create(req.body)
        .then(category=> res.status(200).json(category))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Category.update(req.body, {
        where: {
            id: req.params.id,
        },
    }).then(category => res.status(200).json(category))
        .catch(err => {
            console.error(err);
            res.send(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        },
    }).then(category => res.status(200).json(category))
        .catch(err => {
            console.error(err);
            res.status(500).json(500);
        });
});

module.exports = router;
