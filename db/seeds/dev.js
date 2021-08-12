exports.seed = async function (knex) {
    // truncate all existing tables

    // insert seed data
    await knex('user').insert([{
            id: 1,
            name: 'user1',
            email: 'user1@email.com',
            password: '123',
        },
        {
            id: 2,
            name: 'user2',
            email: 'user2@email.com',
            password: '123',
        },
    ]);

    await knex('address').insert([{
            id: 1,
            state: 'SP',
            city: 'São Paulo',
            street: 'Rua 1',
            number: 42,
            value: 200000,
            ownerId: 1,
        },
        {
            id: 2,
            state: 'MG',
            city: 'Pouso Alegre',
            street: 'Rua 2',
            number: 43,
            value: 300000,
            ownerId: 1,
        },
        {
            id: 3,
            state: 'PA',
            city: 'Belém',
            street: 'Rua 3',
            number: 44,
            value: 400000,
            ownerId: 2,
        },
    ]);
};