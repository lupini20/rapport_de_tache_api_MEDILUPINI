// (Étape 1) Import du DRM mongoose et luxon
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

// (Étape 2) Définition de la méthode qui permet de valider le format d'un email
const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

// (Étape 2) Définition du schéma travailleur


const travailleurSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Departement', required: true },
    nomDepartement: { 
        type: String, 
        required: true,
        enum: ["Ressources humaines", "Marketing", "Informatique", "Comptabilité"] 
    },
    status: { type: String, required: true, enum: ["not yet","done"] },
    tache: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, "Please fill a valid email address"]
    },
    dateOfBirth: {
        type: Date,
        required: true,
        transform: (x) => DateTime.fromJSDate(x).toFormat("dd/MM/yyyy")
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\+243\d{9}/.test(v);
            },
            message: props => `${props.value} c'est ne pas un numero congolais. svp veuillez utilisez ce format "+243XXXXXXXXX".`
        },
        trim: true
    },
});

module.exports = mongoose.model('Travailleur', travailleurSchema);


// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
travailleurSchema.virtual("id").get(function () {
    return this._id;
});

// (Étape 3) Définition de l'object qui sera retourné lorsque la méthode toJSON est appelée
travailleurSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});



// (Étape 4) Définition du schéma département
const departementSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    nom: { type: String, required: true },
    travailleurs: [{ type: Number, ref: 'travailleurs' }]
});

// (Étape 5) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
departementSchema.virtual("id").get(function () {
    return this._id;
});

// (Étape 6) Définition de l'object qui sera retourné lorsque la méthode toJSON est appelée
departementSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

// (

// (Étape 4) Export du modèle travailleur
// Les modèles sont responsables de la création et de la lecture des documents à partir de la base de données MongoDB.
module.exports = mongoose.model("travailleurs", travailleurSchema);