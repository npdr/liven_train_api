const User = require('../db/models/user');
const bcrypt = require('bcrypt');

class UserController {
    async getUserById(req, res) {
        try {
            const user = await User.query()
                .withGraphFetched('address')
                .select('name', 'email')
                .findById(req.params.id);

            if(!user) res.status(404).send({message: 'User not found'});
            
            return res.json(user);
        } catch (err) {
            res.send(400).send(err);
        }

    }

    async getUserByName(req, res) {
        try {
            const user = await User.query()
                .select('name', 'email')
                .withGraphFetched('address')
                .where('name', '=', req.query.name)
            return res.status(200).json(user);
        } catch (err) {
            res.status(400).send(err);
        }

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
                message: 'User updated successfully'
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
                message: 'User deleted successfully'
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

module.exports = UserController;