const User = require('../db/models/user');
const bcrypt = require('bcrypt');

const {
    transaction
} = require('objection');

class UserController {
    async getUserById(req, res) {
        const user = await User.query()
            .withGraphFetched('address')
            .select('name', 'email')
            .where('id', '=', req.params.id);
        return res.json(user);
    }

    async getUserByName(req, res) {
        const user = await User.query()
            .select('name', 'email')
            .withGraphFetched('address')
            .where('name', '=', req.query.name)
        return res.json(user);
    }

    async createUser(req, res) {
        try {
            const {
                name,
                email,
                password
            } = req.body;

            const hash = await bcrypt.hash(password, 10);

            const user = await User.query()
                .insert({
                    name: name,
                    email: email,
                    password: hash,
                });

            return res.status(201).send(user);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async updateUser(req, res) {
        try {
            const {
                name,
                email,
                password
            } = req.body;

            const hash = await bcrypt.hash(password, 10);

            await User.query()
                .patch({
                    name: name,
                    email: email,
                    password: hash,
                })
                .where('id', '=', req.params.id);

            return res.status(201).send({
                message: 'Updated successfully'
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async deleteUser(req, res) {
        try {
            await User.query()
                .delete()
                .where('id', '=', req.params.id)

            return res.status(201).send({
                message: 'Deleted successfully'
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

module.exports = UserController;