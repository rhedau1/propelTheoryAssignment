const cardModel = require("../models/cardModel")
const aws = require("aws-sdk");
const { isValidRequestBody, isValid, isValidObjectId } = require("../validator/validator");

aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",  // id
    secretAccessKey: "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",  // secret password
    region: "ap-south-1"
});



let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        let s3 = new aws.S3({ apiVersion: "2006-03-01" });

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "shubham/" + file.originalname,
            Body: file.buffer,
        };

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err });
            }
            return resolve(data.Location);
        });
    });
};



const createCard = async (req, res) => {
    try {
        const requestBody = req.body;
        let logo = req.files
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid Request parameters. Please provide User details' })
        }

        const { name, companyName, websiteURL, socialURLs, designation } = requestBody

        if (!isValidObjectId(name)) {
            return res.status(400).send({ status: false, message: 'Incorrect objectId' })
        }

        if (!isValid(designation)) {
            return res.status(400).send({ status: false, msg: "Plz enter designation" })
        }

        if (!isValid(socialURLs)) {
            return res.status(400).send({ status: false, msg: "Plz enter vaildsoialUrl" })
        }

        
        if (!isValid(companyName)) {
            return res.status(400).send({ status: false, message: 'Incorrect companyName' })
        }

        if (!isValid(websiteURL)) {
            return res.status(400).send({ status: false, message: 'Incorrect websiteURL' })
        }

        if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.#?&//=]*)/.test(websiteURL))) {
            return res.status(400).send({ status: false, msg: "Please provide a valid Url" })
        }

        if (!(socialURLs)) {
            return res.status(400).send({ status: false, message: 'Incorrect socialURL' })
        }

        if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.#?&//=]*)/.test(socialURLs))) {
            return res.status(400).send({ status: false, msg: "Please provide a social Url" })
        }


        let files = req.files;
        if (files && files.length > 0) {
            let uploadedFileURL = await uploadFile(files[0]);

            const data = { name,designation, companyName, websiteURL, socialURLs, companyLogo: uploadedFileURL }


            let productData = await cardModel.create(data)
            return res.status(201).send({ status: true, msg: "Product updated", data: productData })
        }
        else {
            return res.status(400).send({ status: false, msg: "Company Logo is required" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getCards = async function (req, res) {
    try {
    let businessCardId=req.params.id

    let checkId =await cardModel.findById(businessCardId)
   if(!checkId){
    return res.status(404).send({status:false,msg:"business Card not found"})
   }
   else{
    return res.send({status:true,msg:"business card found",data:checkId})
   }
    } catch (err) {
        res.status(400).send(err)
    }
}
module.exports = { createCard,getCards }