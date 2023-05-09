const express = require('express');
const router = express.Router();


// Import du Contrôleur travailleur
var travailleur_controller = require("../controllers/travailleur");

// (Étape 2) Ajout de la route qui permet d'ajouter un travailleur
router.post("/", travailleur_controller.create);

// (Étape 2) Ajout de la route qui permet d'afficher tous les combattants
router.get("/", travailleur_controller.getAll);

// (Étape 2) Ajout de la route qui permet d'afficher un seul travailleur grâce à son identifant
router.get("/:id", travailleur_controller.getById);

// (Étape 2) Ajout de la route qui permet de modifier un seul travailleur grâce à son identifant
router.put("/:id", travailleur_controller.update);

// (Étape 2) Ajout de la route qui permet de supprimer un seul travailleur grâce à son identifant
router.delete("/:id", travailleur_controller.delete);

// (Étape 1) Export du router
module.exports = router;

// (Étape 2) Ajout de la route qui permet de modifier un seul travailleur grâce à son identifant
router.put("/:id", (req, res) => {
    return res.status(200).json("UPDATE !");
});

// (Étape 2) Ajout de la route qui permet de supprimer un seul travailleur grâce à son identifant
router.delete("/:id", (req, res) => {
    return res.status(200).json("DELETE !");
});

// (Étape 1) Export du router
module.exports = router;