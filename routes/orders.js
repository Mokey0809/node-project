const express = require('express');
const router = express.Router();
let all_orders = undefined;

// Order Model
let Order = require('../models/order');
// User Model
let User = require('../models/user');



// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
  res.render('order_pizza.pug', {
  });
});

// Add Cheese Pizza POST Route
router.post('/add/cheese', function(req, res) {

    var order = new Order();
    order.cust_id = req.user._id;
    order.price = 10;
    order.name = "Cheese";

    order.save(function (err) {
        if (err) {
            console.log(err);

        } else {
            req.flash('success', 'Cheese Pizza was added');
            res.render('order_pizza.pug')
        }
    });
});

// Add Pepperoni pizza post route
router.post('/add/pepperoni', function(req, res) {

    var order = new Order();
    order.cust_id = req.user._id;
    order.price = 12;
    order.name = "Pepperoni";

    order.save(function (err) {
        if (err) {
            console.log(err);

        } else {
            req.flash('success', 'Pepperoni Pizza was added');
            res.render('order_pizza.pug')
        }
    });
});

// router.get('/all', ensureAuthenticated, function(req, res){
// //     res.render('history.pug', {
// //     });
// // });

// router.get('/all', function (req, res) {
//      Order.find({ cust_id:req.user.id }, function(err, results){
//          if(err) {
//              res.send('Unable to find any Orders');
//        }
//         res.render('history.pug', {
//             name: results.name,
//             price: results.price
//          })
//     })
//
// });

router.get('/all', function (req, res) {

    Order.find({cust_id: req.user._id}, function (err, results) {
        if (err) {
            res.send(err)
        }
        res.send(results)
    });
});

// router.post('/all', function (req, res) {
//
//     Order.find({cust_id:req.user._id}, function(err, results){
//         let i;
//         if(err)
//             res.send('error epcciresedasddsfgsdfhfdgh');
//         else if (results === null)
//             res.send('Unable to find any orders');
//         else{
//             for(i in results[0]){
//                 var name = i.name;
//                 var price = i.price;
//             }
//         }
//
//     })
//
// });

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}






// // Get Single order
// router.get('/:id', function(req, res){
//   order.findById(req.params.id, function(err, order){
//     User.findById(order.author, function(err, user){
//       res.render('order', {
//         order:order,
//         author: user.name
//       });
//     });
//   });
// });



module.exports = router;
