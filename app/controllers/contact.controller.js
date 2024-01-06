exports.create = (req, res)=>{
    res.send({
        message: "create handle"
    });
};
exports.findAll = async (req, res,next)=>{
    let documents = [];
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(reg.params.id);
        if(!document){
            return next(404,"contact not found");
        }
        return res.send(document);
    }catch (e){
        return next(
            new ApiError(500,`error retrieving contact with id=${reg.params.id}`)
        );
    }
};
exports.findOne = (req, res)=>{
    res.send({
        message: "findOne handle"
    });
};
exports.update = async (req, res,next)=>{
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const contactService= new ContactService(MongoDB.client);
        const document = await contactService.update(req,params.id, req.body);
        if(!document){
            return next(new ApiError(404,"contact not found"));
        }
        return res.send({
            message: "Contact was udated successfully"
        });
    }catch(e){
        return next (ApiError(500,`Error updating contact with id=${req.params.id}`)
    );
    }
};
exports.delete = async (req, res,next)=>{
    try{
        const contactServive = new ContactService(MongoDB.client);
        const document = await contactServive.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, "not found"));
        }
        return res.send({
            message: "Contact was deleted successfully"
     });
    }catch(e){
        return next(
            new ApiError(500,`Could not delete contact with id${req.params.id}`)
        );
    }
};
exports.deleteAll = async (req, res,next)=>{
    try{
        const contactServive = new ContactService(MongoDB.client);
        const documents = await contactServive.deleteAll();
        return res.send({
            message:`${deletedCount} contacts were deleted successfully`,
        });
    }catch(e){
        return next(new ApiError(500,"An error occurred while removing all contacts"))
    }
};
exports.findAllFavorite =async (req, res,next)=>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    }catch(e){
        return next(
            new ApiError(500,"An error occurred while retrieving favorite contacts")
        );
    }
}

const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");
// };
exports.create = async(reg,res,next)=>{
    if(!reg.body?.name){
        return next(new ApiError(400,"Name can not be empty"));

    }
    try{
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.create(reg.body);
        return res.send(document);
    }catch(e){
        return next(new ApiError(500,"An error occurred while creating the contact "));
    }
}