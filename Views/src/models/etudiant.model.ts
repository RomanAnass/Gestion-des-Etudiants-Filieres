import { Filiere } from "./filiere.model";

export class Etudiant {
    _id!: String;
    nom!: string;
    prenom!: string;
    cne!: string;
    filiere!: Filiere
  }