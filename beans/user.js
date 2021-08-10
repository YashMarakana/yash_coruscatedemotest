let streamifier = require('streamifier');
const csv = require('csvtojson')
const User = require('../model/userData')

const importUsers = async (req, res, next) => {
    try {
        if (!req.files[0]) {
            res.sendStatus(401).send('Invalid request, You need to upload a csv file!');
        }

        let { buffer, mimetype } = req.files[0];
        const fileType = mimetype.includes('csv');

        if (!buffer || !fileType) {
            res.sendStatus(401).send('Invalid file type!');
        }

        streamifier
            .createReadStream(buffer)
            .pipe(csv())
            .then(async (jsonObj) => {
                await addFileData(jsonObj);
                next('File Data added Successfully');
            })
            .catch((e) => {
                res.send(e);
            });
    } catch (err) {
      console.log(err);
    }
}


const fetchUsers = async(req,res,next) => {
    try {
        
       let uData = await User.aggregate([
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$Date"} }, count: { $sum: 1 } } },
        { $sort: { _id: 1} },
        { $project: { $_id:1 , $firstName: 1, $lastName: 1,$email:1,$Amount:1} }
       ])
       
       next(uData)
    } catch (error) {
        console.log("ERROR::::",error);
    }
}
module.exports =  { importUsers,fetchUsers } 