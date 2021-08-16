const Address = require('../db/models/address');
const User = require('../db/models/user');
const {
    addressSchema,
    updateAddressSchema
} = require('../utils/validation');

class AddressController {
    async getAddressById(req, res) {
        try {
            const address = await Address.query()
                .select('state', 'city', 'street', 'number', 'value')
                .findById(req.params.id);

            if (!address) return res.status(404).send({
                message: 'Address not found'
            });

            return res.status(200).json(address);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getAddressByFieldInRange(req, res) {
        try {
            const address = await Address.query()
                .select('state', 'city', 'street', 'number', 'value')
                .where(req.query.field, '>=', req.query.min)
                .where(req.query.field, '<=', req.query.max);

            return res.status(200).send(address);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getAddressByField(req, res) {
        try {
            const qry = Object.keys(req.query);
            if (qry.length > 1) {
                const address = await Address.query()
                    .select('state', 'city', 'street', 'number', 'value')
                    .where(req.query.field, '>=', req.query.min)
                    .where(req.query.field, '<=', req.query.max);

                return res.status(200).send(address);
            } else {
                const field = qry[0];
                const address = await Address.query()
                    .select('state', 'city', 'street', 'number', 'value')
                    .where(field, '=', req.query[field]);
                return res.status(200).send(address);
            }

        } catch (err) {
            res.status(500).send(err);
        }
    }

    async createAddress(req, res) {
        try {
            let address = req.body;

            // validate input data
            const {
                error
            } = addressSchema.validate(address);

            if (error) return res.status(400).send({
                message: error.details[0].message
            });

            // check if user exists
            const userFound = await User.query()
                .findById(address.ownerId);

            if (!userFound) return res.status(404).send({
                message: 'Could not create address: user not found'
            });

            await Address.query()
                .insert(address);

            return res.status(201).send({
                message: 'Address created succesfully',
            });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async updateAddress(req, res) {
        try {
            let address = req.body;

            // validate input data
            const {
                error
            } = updateAddressSchema.validate(address);

            if (error) return res.status(400).send({
                message: error.details[0].message
            });

            const updatedAddress = await Address.query()
                .patch(address)
                .findById(req.params.id);

            if (!updatedAddress) return res.status(404).send({
                message: 'Could not update: address not found'
            });

            return res.status(201).send({
                message: 'Address updated successfully'
            });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async deleteAddress(req, res) {
        try {
            const addressDeleted = await Address.query()
                .delete()
                .findById(req.params.id);

            if (!addressDeleted) return res.status(404).send({
                message: 'Could not delete: address not found'
            });

            return res.status(201).send({
                message: 'Address deleted successfully'
            });
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = AddressController;