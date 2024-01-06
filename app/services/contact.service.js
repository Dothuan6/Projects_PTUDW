const {objectId, ReturnDocument} = require("mongodb");
const ApiError = require("../api-error");

class ContactService{
    constructor(client){
        this.Contact = client .db().collection("contacts");

    }
    extractConactData(payload){
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        objects.keys(contact).forEach((key) => contact[key] === undefined && delete contact[key]);
        return contact;
    }
    async create(payload){
        const contact = this.extractConactData(payload);
        const result = await this.contact.findOneAndUpdate(
            contact,
            {$set: {favorite: contact.favorite===true}},
            {ReturnDocument: "after", upsert: true}
        );
        return result.value;  
    }
    async findById(id){
        return await this.Contact.findOne({
            _id: objectId.isValid(id) ? new objectId(id): null,
        });
    }
    async update(id,payload){
        const filter = {
            _id: objectId.isValid(id) ? new objectId(id): null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            {$set:update},
            {ReturnDocument:"after"}
        );
        return result.value;
    }
    async delete(id){
        const result = await this.contact.findOneAndDelete({
            _id: objectId.isValid(id) ? new objectId(id): null,
        });
        return result.value;
    }
    async findFavorite(){
        return await this.findById({
            favorite: true
        });
    }
    async deleteAll(){
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = ContactService;