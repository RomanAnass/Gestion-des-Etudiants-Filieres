import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../../providers/auth.service/auth-service.service';
import { Etudiant } from '../../../models/etudiant.model';
import { EtudiantServiceService } from '../../../providers/etudiant.service/etudiant-service.service';
import { FilieresComponent } from '../filieres/filieres.component';
import { Filiere } from 'src/models/filiere.model';
import { FiliereServiceService } from 'src/providers/filiere.service/filiere-service.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.scss']
})
export class EtudiantsComponent implements OnInit {


  etudiants!: Etudiant[];
  filieres!: Filiere[];
  selectedEtd!: Etudiant;
  cols!: { field: string; header: string; }[];
  totalUsers!: number;
  length:any;
  etudiant!: Etudiant;
  newEtudiant!: boolean;
  displayDialog!: boolean;
  EtudiantDialog!: boolean;
  submitted:any;
  editEtudiantForm: any;
  CreateNewEtudiant:  any
  newEtudiantDialog!: boolean;
  loggedEtudiant!: string;
  totalEtudiant!: number; 
  
  constructor(
    private etudiantService: EtudiantServiceService,
    private filiereService: FiliereServiceService,
    private fb: FormBuilder,
    private toastr:ToastrService,
    private authService:AuthServiceService
    ) { }

     // Update User Form
  etudiantForm = this.fb.group ({
    nom : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    prenom : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    cne: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50) ]],
    filiere_id:['', [Validators.required]],

  });
  // Create New User Form
  newEtudiantForm = this.fb.group ({
    nom : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    prenom : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    cne: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(50) ]],
    filiere_id:['', [Validators.required]],
  });

  ngOnInit(): void {
  
    this.getEtudiant();
    this.getFilieres();

    this.loggedEtudiant = this.authService.getUserName();
    //console.log( 'loggedUser >>',this.loggedUser);
    this.cols = [
      { field: 'nom', header: 'nom' },
      { field: 'prenom', header: 'prenom' },
      { field: 'cne', header: 'cne' },
      { field: 'filiere', header: 'filiere' }
  ];
  
  }

// Get Users
getEtudiant(){
  this.etudiantService.getEtudiants().subscribe(
    (res :any) =>{
      //debugger;
      let data = res?.['data'];
      console.log(data)
      this.etudiants = data;
      this.totalEtudiant = this.etudiants?.length ;
      console.log('etudiant >>>',this.etudiants[0]._id);
  
    // console.log(res)
      },
      err =>{
      console.log(err);
    }
  )
}



// update userform with user values
editEtudiant(etudiant: Etudiant) {
  
  console.log(etudiant);
  this.etudiant = etudiant;
  this.EtudiantDialog = true;
  this.etudiantForm.patchValue({
    nom : etudiant.nom,
    prenom : etudiant.prenom,
    cne : etudiant.cne,
   });
   console.log('etudiantform',this.etudiantForm);
   
}

// Get filieres
getFilieres(){
  this.filiereService.getFilieres().subscribe(
    (res :any) =>{
      //debugger;
      let data = res?.['data'];
      console.log(data)
      this.filieres = data;
      console.log('filieres >>>',this.filieres[0]._id);
    // console.log(res)
      },
      err =>{
      console.log(err);
    }
  )
}


// map userform with new data
mapValues() {
  //this.etudiant.nom = this.etudiantForm.value.nom;
  //this.etudiant.prenom = this.etudiantForm.value.prenom;
  //this.etudiant.cne = this.etudiantForm.value.cne;
 }

 



 // Submit Edit user Form
submitEditetudiantForm(etudiantForm : FormGroup ,etudiantId : String){
  
  
  this.editEtudiantForm = etudiantForm.value;
  const editData= {
     id :   etudiantId ,
     nom :  this.editEtudiantForm.nom,
     prenom : this.editEtudiantForm.prenome,
     cne : this.editEtudiantForm.cne,
     filiere: this.editEtudiantForm.filiere_id
  }
  this.submitted = true;
  console.log(etudiantForm)
    if (etudiantForm.invalid) {
      this.validateAllFormFields(this.etudiantForm); // Triger etudiantForm validation
      this.toastr.error('Veuillez remplir tous les champs requis');
    } else {
       this.etudiantService.editEtudiantForm(editData).subscribe((data) =>{
       this.EtudiantDialog = false;
       window.location.reload();
       this.toastr.success("L'etudiant a été modifié avec succès");
    }),
    (err: any) =>{
      this.toastr.error("L'etudiant n'a pas été modifié");
       console.log(err);
     }
    }
     
  }

  // Submit Create user Form
  submitCreateetudiantForm(newEtudiantForm : FormGroup){
    
    //console.log('newUserForm >>>',newUserForm.value);
    console.log(newEtudiantForm.value)
    
    this.CreateNewEtudiant = newEtudiantForm.value;
    const createDataEtudiant = {
       nom :  this.CreateNewEtudiant.nom,
       prenom : this.CreateNewEtudiant.prenom,
       cne : this.CreateNewEtudiant.cne,
       filiere: this.CreateNewEtudiant.filiere_id
    }
  
    this.submitted = true;
      if (newEtudiantForm.invalid) {
        this.validateAllFormFields(this.newEtudiantForm); // Triger userForm validation
        this.toastr.error('Veuillez remplir tous les champs requis');
      } else {
         this.etudiantService.createEtudiantForm(createDataEtudiant).subscribe((data) =>{
         this.EtudiantDialog = false;
         window.location.reload();
         this.toastr.success("L'utilisateur a été ajouté avec succès");
      }),
      (err: any) =>{
        this.toastr.error("L'utilisateur n'a pas été ajouté");
         console.log(err);
       }
      }
      
    }




    // To validate all form fields, we need to iterate throughout all form controls:
validateAllFormFields(formGroup: FormGroup) {
  
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
  

  }

  createNewEtudiant(){
    this.newEtudiantDialog = true;
  }

  hideDialog() {
    this.EtudiantDialog = false;
    this.submitted = false;
  }

  hideEtudiantDialog() {
    this.newEtudiantDialog = false;
    this.submitted = false;
  }

  
  //Global Search
  onRowSelect(event : any) {
    this.newEtudiant = false;
    this.etudiant = this.cloneUser(event.data);
    this.displayDialog = true;
}

cloneUser(e: Etudiant): Etudiant {

  for (let prop in e) {
    // this.etudiant[prop] = e[prop];
  }
  return this.etudiant;

}

getEventValue($event:any) :string {
  return $event.target.value;
} 
  

}
