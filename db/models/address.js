const { Model } = require('objection');

class Address extends Model {
    static get tableName() {
        return 'address';
    }

    static get relationMappings() {
        const User = require('./user');
        
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'user.id',
                    to: 'address.ownerId',
                }
            }
        }
    }
}

module.exports = Address;