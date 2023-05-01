const mongoose = require('mongoose');

const departementSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true,
        enum: ["Ressources humaines", "Marketing", "Informatique", "Comptabilité"] 
    }
});


module.exports = mongoose.model('Departement', departementSchema);
