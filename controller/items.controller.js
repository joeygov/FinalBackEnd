const express = require('express');

const Items = require('../models/model.item.js');
const app = express();

//adding items to db
module.exports.create = (req, res) => {
    const ItemToCreate = new Items(
        {   
            URL: req.body.URL,
            //itemID: req.body.itemID,
            //companyID: req.body.companyID,
            category: req.body.category,
            brand: req.body.brand,
            model: req.body.model,
            sitingcapacity: req.body.sitingcapacity,
            //color: req.body.color,
            location: req.body.location,
            rate: req.body.rate,
            status: req.body.status,

        }
    );
    ItemToCreate.save((err, items) => {
        if (err) {
            res.send(err);
        }
        res.json(items);
    });
};

app.use((err, req, res, next) => {
    if (err.code === "INCORRECT_FILETYPE") {
      res.status(422).json({ error: 'Only images are allowed' });
      return;
    }
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(422).json({ error: 'Allow file size is 500KB' });
      return;
    }
  });
  

//getting all Items
// exports.getAll('/itemList', (req, res) => {
//     Items.find({}, (err, items) => {
//         if (err) {
//             res.send(err);
//         }
//         res.send({ items: items });
//     });
// });


// //getting items by ID
// exports.getById = (req, res) => {
//     Items.findById(req.params.itemID, (err, item) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(item);
//     });
// }

// /**
//  * Function used to delete by id an item.
//  */
// exports.delete = (req, res) => {
//     Items.findByIdAndDelete(req.params.itemID,
//         (err,item) => {
//         if(err){
//             res.send(err);
//         }
//         res.json(item);
//     });
// }

