const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        const Address = require('./address');
        
        return {
            address: {
                relation: Model.HasManyRelation,
                modelClass: Address,
                join: {
                    from: 'user.id',
                    to: 'address.ownerId',
                }
            }
        }
    }
}

module.exports = User;