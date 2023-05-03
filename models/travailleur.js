const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const travailleurSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  
 // nomDepartement: {
   // type: String,
    //required: true,
   // enum: ["Ressources humaines", "Marketing", "Informatique", "Comptabilité"],
  //},
  status: { type: String, required: true, enum: ["not yet", "done"] },
  tache: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  dateOfBirth: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toFormat("dd/MM/yyyy"),
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\+243\d{9}/.test(v);
      },
      message: (props) =>
        `${props.value} c'est ne pas un numero congolais. svp veuillez utilisez ce format "+243XXXXXXXXX".`,
    },
    trim: true,
  },
  departementId: { type: Number, ref: "departements" },
  
});

// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
travailleurSchema.virtual("id").get(function () {
  return this._id;
});

// (Étape 3) Définition de l'objet qui sera retourné lorsque la méthode toJSON est appelée
travailleurSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// (Étape 4) Export du modèle Fighter
module.exports = mongoose.model("travailleurs", travailleurSchema);