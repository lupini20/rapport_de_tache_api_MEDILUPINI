const Departement = require('../models/departement');

exports.create = (req, res) => {
  const newDepartement = new Departement({
    _id: req.body.id,
    nom: req.body.nom
  });

  newDepartement.save((err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(201).json("Departement  created successfully !");
  });
};

exports.getAll = (req, res) => {
  departements.find({}, (err, departements) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(departements);
  });
};

exports.getOne = (req, res) => {
  Departement.findById(req.params.id, (err, departement) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!departement) {
      return res.status(404).json("departement not found !");
    }
    return res.status(200).json(departement);
  });
};

exports.update = (req, res) => {
  Departement.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        nom: req.body.nom
      }
    },
    { new: true },
    (err, deparetemnt) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!deparetemnt) {
        return res.status(404).json("departement not found !");
      }
      return res.status(200).json(deparetemnt);
    }
  );
};

exports.delete = (req, res) => {
  Departement.findByIdAndRemove(req.params.id, (err, departement) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!departement) {
      return res.status(404).json("departement not found !");
    }
    return res.status(200).json("departement deleted successfully !");
  });
};
