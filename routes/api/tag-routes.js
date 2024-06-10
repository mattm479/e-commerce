const router = require('express').Router();
const { Tag, Product} = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    Tag.findAll({ include: Product })
        .then(tags => res.status(200).json(tags))
        .catch(err => {
            console.error(err);
            res.send(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Tag.findByPk(req.params.id, { include: Product })
        .then(tag => res.status(200).json(tag))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Tag.create(req.body)
        .then(tag => res.status(200).json(tag))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Tag.update(req.body, {
        where: {
            id: req.params.id,
        },
    }).then(tag => res.status(200).json(tag))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id
        }
    }).then(tag => res.status(200).json(tag))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

module.exports = router;
