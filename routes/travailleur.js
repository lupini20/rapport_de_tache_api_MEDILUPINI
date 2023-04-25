// (Étape 1) Import de express
var express = require('express');

// (Étape 1) Définition du router
var router = express.Router();

// Import du Contrôleur travailleur
var travailleur_controller = require("../controllers/travailleur");

// (Étape 2) Ajout de la route qui permet d'ajouter un travailleur
router.post("/", travailleur_controller.create);

// (Étape 2) Ajout de la route qui permet d'afficher tous les travailleurs
router.get("/", travailleur_controller.getAll);

// (Étape 2) Ajout de la route qui permet d'afficher un seul travailleur grâce à son identifant
router.get("/:id", travailleur_controller.getById);

// (Étape 2) Ajout de la route qui permet de modifier un seul travailleur grâce à son identifant
router.put("/:id", travailleur_controller.update);

// (Étape 2) Ajout de la route qui permet de supprimer un seul travailleur grâce à son identifant
router.delete("/:id", travailleur_controller.delete);

// (Étape 1) Export du router
module.exports = router;