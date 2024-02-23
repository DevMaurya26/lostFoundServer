const express = require('express')
const router = express.Router()
const userModel = require('../DB/signupDB')
const itemModel = require('../DB/itemDB')
const multer = require("multer");
const path = require("path");

router.get('/apide', (req, res) => {
  const data = { d: "Hello Dev maurya" }
  res.json(data)
})

router.get('/recent', async (req, res) => {
  const itemdata = await itemModel.find({}).sort({ _id: -1 }).limit(4).exec()

  if (itemdata) {
    res.send(JSON.stringify(itemdata))
  }
  else {
    console.log('error in fetching data items.')
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, './public/uploads') },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 1000000 },
}).single("image");

router.post('/upload', upload, async (req, res) => {
  const { username, contact, objectName, location, date } = req.body;
  try {

    const newitem = await itemModel.create({
      name: username,
      contact: contact,
      objectName: objectName,
      location: location,
      userSelectedDate: date,
      uploadedImage: req.file.originalname,
    });
    const isSave = await newitem.save();
    if (isSave) {
      console.log("Saved in DB");
    } else {
      console.log("error in saving the data");
    }
    res.send({redirectUrl: '/lost-items'})
  } catch (err) {
    res.send({ err: 'Mobile Number already exsist.!' })
  }

  res.end()
})

// router.post('/upload', async (req, res) => {

//     const storage = multer.diskStorage({
//         destination: "../Client/public/uploads",
//         filename: function (req, file, cb) {
//           cb(null, file.originalname);
//         },
//       });

//       const upload = multer({
//         storage: storage,
//         limits: { fileSize: 1000000 },
//       }).single("image");

//       upload(req, res, async (err) => {
//         if (err) {
//           console.log(err);
//         } else {
//           const { username, contact, objectName, location, date } = req.body;
//           const newitem = new itemModel({
//             name: username,
//             contact: contact,
//             objectName: objectName,
//             location: location,
//             userSelectedDate: date,
//             uploadedImage: req.file.originalname,
//           });
//           const isSave = await newitem.save();
//           if (isSave) {
//             console.log("Saved in DB");
//           } else {
//             console.log("error in saving the data");
//           }
//         }
//       });
//     res.end();
// })


router.get('/lostitem', async (req, res) => {
  const itemdata = await itemModel.find({}).exec()
  // const itemdata = await itemModel.find({}).sort({ _id: -1 }).limit(3).exec()
  if (itemdata) {
    // console.log(JSON.stringify(itemdata))
    res.send(JSON.stringify(itemdata))
  }
  else {
    console.log('error in fetching data items.')
  }
})


router.post('/registerdata', async (req, res) => {
  var data = { d: 'Done', redirectUrl: '/login' };
  console.log(req.body);
  let isUserExist = false
  await userModel.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      isUserExist = true
      res.send({ err: 'User Already Exist' })
      res.end()
    }
  })

  if (!isUserExist) {
    res.send(data);
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    const isSave = await newUser.save()
    if (isSave) {
      console.log('Saved in DB')
    }
    else {
      console.log('error in saving the data')
    }
  }
  res.end()
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  // console.log(req.body.password)
  userModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        console.log('User found');
        (password == user.password) ? res.send({ redirectUrl: '/lost-items' }) : res.send({ err: 'id or pass incorrect' })

      } else {
        res.send({ err: 'User not found' })
        console.log('User not found');
      }
    })
    .catch((err) => {
      console.error('Error in login:', err);
    });

})



module.exports = router