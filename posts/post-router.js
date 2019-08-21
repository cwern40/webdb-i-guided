const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
// SELECT * FROM Posts;
    db('posts')
    //db.select('*').from('posts'); is the same as the above.
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Not working right"
            });
        });
});

router.get('/:id', (req, res) => {
    //db('posts').where('id', req.params.id) same as below
    db.select('*').from('posts').where('id', req.params.id)
        .then(posts => {
            const post = posts[0]
            if (post) {
            res.json(post)
        } else {
            res.status(404).json({
                message: 'invalid ID'
            })
        }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Not working right"
            });
        });
});

router.post('/', (req, res) => {
    //INSERT INTO Posts (all of ques from req.body) VALUES (all of the values from req.body)
    const postDate = req.body

    db('posts').insert(postDate)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err
            });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    //UPDATE Posts SET key = value, key = value WHERE id = id
    db('posts').where({ id }).update(changes)
        .then(update => {
            if (update) {
                res.json({ update: update })
            } else {
                res.status(404).json({
                    message: 'invalid post id'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err
            });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params

    db('posts').where({ id }).del()
        .then(remove => {
            res.json(remove)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "unable to delete item"
            })
        })

});

module.exports = router;