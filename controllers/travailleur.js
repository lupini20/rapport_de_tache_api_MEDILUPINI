// Import du modèle travailleur
var Travailleur = require("../models/travailleur");
var { ObjectId } = require('mongoose').Types;







// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const TravailleurValidationRules = () => {
  return [
    body("firstName")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Vous devez entrer un prénom valide.")
      .isAlphanumeric()
      .withMessage("Le prénom ne doit pas contenir de caractères spéciaux."),
    body("lastName")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Vous devez entrer un nom de famille valide.")
      .isAlphanumeric()
      .withMessage("Le nom de famille ne doit pas contenir de caractères spéciaux."),
    body("tache")
      .exists()
      .withMessage("La tâche est requise.")
      .trim()
      .isLength({ min: 1 })
      .withMessage("La tâche ne peut pas être vide.")
      .isString()
      .withMessage("La tâche doit être une chaîne de caractères.")
      .escape(),
    
    body("status")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Vous devez sélectionner un statut."),
    body("email").isEmail().withMessage("Veuillez entrer une adresse e-mail valide."),
    body("dateOfBirth", "Veuillez entrer une date de naissance valide.")
      .optional({ checkFalsy: true })
      .isISO8601()
      .toDate(),
    body("phoneNumber", "Veuillez entrer un numéro de téléphone valide.")
      .exists()
      .withMessage("Le numéro de téléphone est requis.")
      .isString()
      .withMessage("Le numéro de téléphone doit être une chaîne de caractères.")
      .matches(/\+243\d{9}/)
      .withMessage("Le numéro de téléphone doit être au format +243XXXXXXXXX."),

      body("departementId")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("departementID must be specified.")
  ];
};

const paramIdValidationRule = () => {
  return [
    param("id")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("L'identifiant doit être spécifié.")
      .isNumeric()
      .withMessage("L'identifiant doit être un nombre."),
  ];
};

const bodyIdValidationRule = () => {
  return [
    body("id")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("L'identifiant doit être spécifié.")
      .isNumeric()
      .withMessage("L'identifiant doit être un nombre."),
  ];
};

// Méthode de vérification de la conformité de la requête  
const checkValidity = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
      return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
      errors: extractedErrors,
  })
}

// Create
exports.create = [bodyIdValidationRule(), TravailleurValidationRules(), checkValidity, (req, res, next) => {
  
  

  // Création de la nouvelle instance de travailleurà ajouter 
  var travailleur= new Travailleur({
      _id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      status: req.body.status,
      email:req.body.email,
      tache: req.body.tache,
      phoneNumber: req.body.phoneNumber,
      departementId: req.body.departementId,
      dateOfBirth: req.body.dateOfBirth,
    });

  // Ajout de travailleurdans la bdd 
  travailleur.save(function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json("travailleurcreated successfully !");
  });
}];

// Read
exports.getAll = (req, res, next) => {
  Travailleur.find()
    .populate("departementId")
    .exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
  Travailleur.findById(req.params.id).populate("departementId").exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
  });
}];

// Update
exports.update = [paramIdValidationRule(), TravailleurValidationRules(), checkValidity,(req, res, next) => {
  
  // Création de la nouvelle instance de travailleur à modifier 
  var travailleur = new Travailleur({
      _id: req.params.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      status: req.body.status,
      tache: req.body.tache,
      phoneNumber: req.body.phoneNumber,
      email:req.body.email,
      departementId: req.body.departementId,
      dateOfBirth: req.body.dateOfBirth,
    });

    Travailleur.findByIdAndUpdate(req.params.id, travailleur, function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      if(!result){
          res.status(404).json("Travailleur with id "+req.params.id+" is not found !");
      }
      return res.status(201).json("travailleur updated successfully !");
    });
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity,(req, res, next) => {
  Travailleur.findByIdAndRemove(req.params.id).exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      if(!result){
          res.status(404).json("travailleur with id "+req.params.id+" is not found !");
      }
      return res.status(200).json("travailleur deleted successfully !");
    });
}];