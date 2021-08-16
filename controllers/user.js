const User = require('../db/models/user');
const bcrypt = require('bcrypt');
const {
    userSchema,
    updateUserSchema
} = require('../utils/validation');

class UserController {
    async getUserById(req, res) {
        try {
            const user = await User.query()
                .withGraphFetched('address')
                .select('name', 'email')
                .findById(req.params.id);

            if (!user) return res.status(404).send({
                message: 'User not found'
            });

            return res.status(200).json(user);
        } catch (err) {
            return res.send(400).send(err);
        }

    }

    async getUserByField(req, res) {
        try {
            const field = Object.keys(req.query)[0];
            const user = await User.query()
                .select('name', 'email')
                .withGraphFetched('address')
                .where(field, '=', req.query[field]);

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).send(err);
        }

    }

    async createUser(req, res) {
        try {
            let user = req.body;

            // validate input data
            const {
                error
            } = userSchema.validate(user);

            if (error) return res.status(400).send({
                message: error.details[0].message
            });

            // check if user exists
            const userFound = await User.query()
                .findOne({
                    email: user.email
                });
            
            if (userFound) return res.status(400).send({
                message: 'User already exists'
            });

            // hash password, then insert user
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;

            await User.query()
                .insert(user);

            return res.status(201).send({
                message: 'User succesfully created',
                user: user
            });
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async updateUser(req, res) {
        try {
            let user = req.body;

            // validate input data
            const {
                error
            } = updateUserSchema.validate(user);

            if (error) return res.status(400).send({
                message: error.details[0].message
            });

            // check if user exists
            const userFound = await User.query()
                .findById(req.params.id);

            if (!userFound) return res.status(404).send({
                message: 'Could not update: user not found'
            });

            // if needed, hash new password and update user
            if (user.password) {
                const hash = await bcrypt.hash(user.password, 10);
                user.password = hash;
            }

            await User.query()
                .patch({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                })
                .where('id', '=', req.params.id);

            return res.status(200).send({
                message: 'User updated successfully'
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async deleteUser(req, res) {
        try {
            //deletes if found user
            const userDeleted = await User.query()
                .delete()
                .findById(req.params.id);

            if (!userDeleted) return res.status(404).send({
                message: 'Could not delete: user not found'
            });

            return res.status(200).send({
                message: 'User deleted successfully'
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

module.exports = UserController;