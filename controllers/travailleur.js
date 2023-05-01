// Import du modèle travailleur
var Travailleur = require("../models/travailleur");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const travailleurValidationRules = () => {
    return [   
        body("firstName")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("tu dois ecrire quelque ici")
            .isAlphanumeric()
            .withMessage("First name n'a pas de l'alphanumeric characters."),

        body("lastName")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("tu dois ecrire quelque ici")
            .isAlphanumeric()
            .withMessage("First name n'a pas de l'alphanumeric characters."),

        body("tache")
        .exists()
        .withMessage("La tâche est requise")
        .trim()
        .isLength({ min: 1 })
        .withMessage("La tâche ne peut pas être vide")
        .isString()
        .withMessage("La tâche doit être une chaîne de caractères")
        .escape(),      

        body("departement")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("tu dois choisir quelque chose ici."),

        body("status")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("tu dois choisir quelque chose ici."),

        body("email").isEmail().withMessage(" email invalide"),

        body("dateOfBirth", "date de naissance invalide")
            .optional({ checkFalsy: true })
            .isISO8601()
            .toDate(),

            body("phoneNumber", "Numéro de téléphone invalide")
            .exists()
            .withMessage("Le numéro de téléphone est requis")
            .isString()
            .withMessage("Le numéro de téléphone doit être une chaîne de caractères")
            .matches(/\+243\d{9}/)
            .withMessage("Le numéro de téléphone doit être au format +243XXXXXXXXX"),
         
    ]
}

const paramIdValidationRule = () => {
    return [
        param("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("tu dois ecrire quelque chose ici.")
            .isNumeric()
            .withMessage("ca doit etre un numbre.")
    ]
};

const bodyIdValidationRule = () => {
    return [
        body("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
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
exports.create = [bodyIdValidationRule(), travailleurValidationRules(), checkValidity, (req, res, next) => {
    
    // Création de la nouvelle instance de travailleur à ajouter 
    var travailleur = new Travailleur({
        _id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        departement: req.body.departement,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        tache: req.body.tache,
        status: req.body.status,
      });

    // Ajout de travailleur dans la bdd 
    travailleur.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Travailleur created successfully !");
    });
}];

// Read
exports.getAll = (req, res, next) => {
    Travailleur.find(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
};

// Read
exports.getByDepartment = [param("department").trim().escape(), checkValidity, (req, res, next) => {
    Travailleur.find({ departement: req.params.department }, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
}];

exports.getAll = (req, res, next) => {
    const departement = req.body.departement;
    const query = departement ? { departement: departement } : {};
    Travailleur.find(query, function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
};


exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    travailleur.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
}];

// Update
exports.update = [paramIdValidationRule(), travailleurValidationRules(), checkValidity,(req, res, next) => {
    
    // Création de la nouvelle instance de travailleur à modifier 
    var travailleur = new Travailleur({
        _id: req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        departement: req.body.departement,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        tache: req.body.tache,
        status: req.body.status,
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
            res.status(404).json("Travailleur with id "+req.params.id+" is not found !");
        }
        return res.status(200).json("Travailleur deleted successfully !");
      });
}];