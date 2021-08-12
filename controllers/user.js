const User = require('../db/models/user');
const {
    transaction
} = require('objection');

class UserController {
    async getUserById(req, res) {
        const user = await User.query()
            .select('name', 'email')
            .where('id', '=', req.params.id);
        return res.json(user);
    }

    async getUserByName(req, res) {
        const user = await User.query()
            .select('name', 'email')
            .where('name', '=', req.query.name)
        return res.json(user);
    }

    async createUser(req, res) {
        const trx = await User.startTransaction();

        try {
            const user = await User.query(trx).insert({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            await trx.commit();
            return res.status(201).send(user);
        } catch (err) {
            await trx.rollback();
            res.status(400).send(err);
        }
    }
}

module.exports = UserController;