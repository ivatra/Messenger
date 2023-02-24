const { Contact } = require("../models/contactModel");
const { Sequelize } = require("../postgre");

class contactsQueries {
    async receiveContactsByUser(userId, status) {
        return await Contact.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { senderId: userId },
                    { recipientId: userId },
                ],
                status: status,
            },
            attributes: ['senderId', 'recipientId'],
        })
    }
    async receiveContact(firstUser, secondUser) {
        return await Contact.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { senderId: firstUser, recipientId: secondUser },
                    { recipientId: secondUser, senderId: firstUser }
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
                    { recipientId: secondUser, senderId: firstUser }
                ]
            }
        });
    }

    async createContact(senderId,contactId){
        return await Contact.create({ senderId: senderId, recipientId: contactId, status: "accepted" })
    }
}

module.exports = new contactsQueries()