const { Contact } = require("../models/contactModel");
const { Sequelize } = require("../postgre");

class contactsQueries {
    async receiveContactsAndCountByUser(userId, status = null, limit, offset) {
        const whereClause = {
            [Sequelize.Op.or]: [
                { senderId: userId },
                { recipientId: userId },
            ],
            ...(status ? { status } : {}),
        };

        const contacts = await Contact.findAll({
            where: whereClause,
            limit,
            offset,
            attributes: ['senderId', 'recipientId', 'status', 'id'],
        });

        const count = await Contact.count({ where: whereClause });

        return { contacts, count };
    }
    async receiveContact(firstUser, secondUser) {
        return await Contact.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { senderId: firstUser, recipientId: secondUser },
                    { senderId: secondUser, recipientId: firstUser }
                ]
            }
        });
    }

    async updateContactStatus(firstUser, secondUser, status) {
        return await Contact.update({ status: status },
            {
                where: {
                    [Sequelize.Op.or]: [
                        { senderId: firstUser, recipientId: secondUser },
                        { recipientId: secondUser, senderId: firstUser }
                    ]
                },
            }
        );
    }

    async destroyContact(firstUser, secondUser) {
        return await Contact.destroy({
            where: {
                [Sequelize.Op.or]: [
                    { senderId: firstUser, recipientId: secondUser },
                    { senderId: secondUser, recipientId: firstUser }
                ]
            }
        });
    }

    async createContact(senderId, contactId) {
        return await Contact.create({ senderId: senderId, recipientId: contactId, status: 'pending' })
    }
}

module.exports = new contactsQueries()