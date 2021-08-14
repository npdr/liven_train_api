const Address = require('../db/models/address');

class AddressController {
    async getAddressById(req, res) {
        try {
            const addresses = await Address.query()
                .select('state', 'city', 'street', 'number', 'value')
                .findById(req.params.id);
            return res.status(200).json(addresses);
        } catch (err) {
            res.status(400).send(err);
        }

    }

    async getAddressByUserId(req, res) {
        try {
            const address = await Address.query()
                .select('state', 'city', 'street', 'number', 'value')
                .where('ownerId', '=', req.params.id);

            return res.status(200).send(address);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async getAddressInRange(req, res) {
        try {
            const address = await Address.query()
                .select('state', 'city', 'street', 'number', 'value')
                .where('value', '>=', req.query.min)
                .where('value', '<=', req.query.max);

            return res.status(200).send(address);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async getAddressByState(req, res) {
        try {
            const address = await Address.query()
                .select('state', 'city', 'street', 'number', 'value')
                .where('state', '=', req.query.state)

            return res.status(200).send(address);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async createAddress(req, res) {
        try {
            const {
                state,
                city,
                street,
                number,
                value,
                ownerId
            } = req.body;

            const address = await Address.query()
                .insert({
                    state: state,
                    city: city,
                    street: street,
                    number: number,
                    value: value,
                    ownerId: ownerId
                });

            return res.status(201).send({
                message: 'Address created succesfully',
                address: address
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async updateAddress(req, res) {
        try {
            const {
                state,
                city,
                street,
                number,
                value
            } = req.body;

            await Address.query()
                .patch({
                    state: state,
                    city: city,
                    street: street,
                    number: number,
                    value: value
                })
                .where('id', '=', req.params.id);

            return res.status(201).send({
                message: 'Address updated successfully'
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async deleteAddress(req, res) {
        try {
            await Address.query()
                .delete()
                .where('id', '=', req.params.id)

            return res.status(201).send({
                message: 'Address deleted successfully'
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

module.exports = AddressController;