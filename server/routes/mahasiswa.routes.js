var express = require("express");
var router = express.Router();
var Mahasiswa = require("../models/mahasiswa.models");

// GET / - list all mahasiswa
// POST createtoken / (nim) - create token for mahasiswa
// GET / (nim) - get mahasiswa
// POST(nim) / (vote) - vote
// GET count/(vote) - count voting

function createToken(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.get("/", function(req, res, next) {
  Mahasiswa.find(function(err, mahasiswa) {
    if (err) {
      console.log(err);
    } else {
      res.json(mahasiswa);
    }
  });
});

router.post("/createtoken/:nim", function(req, res, next) {
  let nim = req.params.nim;
  Mahasiswa.findOne({ nim }, function(err, mahasiswa) {
    if (err) {
      console.log(err);
    }
    if (mahasiswa == null) {
      let token = createToken(4);
      let mahasiswa = new Mahasiswa({
        nim,
        token
      });
      mahasiswa
        .save()
        .then(mahasiswa => {
          res.status(200).json({ status: "success", token });
        })
        .catch(err => {
          res.status(400).json({ status: "failed" });
        });
    } else {
      res.json({ status: "failed", message: "nim exist" });
      //next();
    }
  });
});

router.get("/:nim", function(req, res, next) {
  let nim = req.params.nim;
  Mahasiswa.findOne({ nim }, function(err, mahasiswa) {
    if (err) {
      console.log(err);
    }
    res.json(mahasiswa);
  });
});

router.post("/:nim/:vote", function (req, res, next) {
  let nim = req.params.nim;
  let vote = req.params.vote;
  Mahasiswa.findOneAndUpdate(
    { nim , vote: null },
    {
      vote: {
        id: vote,
        date: new Date().toISOString()
      }
    },
    { upsert: false, useFindAndModify: false },
    function(err, mahasiswa) {
      if (err) return res.send(500, { error: err });
      return res.json(mahasiswa);
    }
  );
});

router.get("/count/:vote", function(req, res, next) {
  Mahasiswa.find({ 
    'vote.id': req.params.vote
   }, function(err, mahasiswa) {
    if (err) {
      console.log(err);
    }
    res.json(mahasiswa);
  });
});


module.exports = router;
