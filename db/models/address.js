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
                    from: 'address.ownerId',
                    to: 'user.id',
                }
            }
        }
    }
}

module.exports = Address;