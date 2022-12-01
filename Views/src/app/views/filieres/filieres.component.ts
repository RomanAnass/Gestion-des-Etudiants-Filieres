import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../../providers/auth.service/auth-service.service';
import { Filiere } from '../../../models/filiere.model';
import { FiliereServiceService } from '../../../providers/filiere.service/filiere-service.service';
@Component({
  selector: 'app-filieres',
  templateUrl: './filieres.component.html',
  styleUrls: ['./filieres.component.scss']
})
export class FilieresComponent implements OnInit {

  filieres!: Filiere[];
  selectedFil!: Filiere;
  cols!: { field: string; header: string; }[];
  totalFiliere!: number;
  length:any;
  filiere!: Filiere;
  newFiliere!: boolean;
  displayDialog!: boolean;
  FiliereDialog!: boolean;
  submitted:any;
  editFiliereForm: any;
  CreateNewFiliere:  any
  newFiliereDialog!: boolean;
  loggedEtudiant!: string;
  
  constructor(
    private filiereService: FiliereServiceService,
    private fb: FormBuilder,
    private toastr:ToastrService,
    private authService:AuthServiceService
    ) { }

     // Update User Form
  filiereForm = this.fb.group ({
    code : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    libelle : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });
  // Create New User Form
  newFiliereForm = this.fb.group ({
    code : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    libelle : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  ngOnInit(): void {
  
    this.getFilieres();

    this.loggedEtudiant = this.authService.getUserName();
    //console.log( 'loggedUser >>',this.loggedUser);
    this.cols = [
      { field: 'code', header: 'code' },
      { field: 'libelle', header: 'libelle' },
  ];
  
  }

// Get Users
getFilieres(){
  this.filiereService.getFilieres().subscribe(
    (res :any) =>{
      //debugger;
      let data = res?.['data'];
      console.log(data)
      this.filieres = data;
      this.totalFiliere = this.filieres?.length ;
      console.log('etudiant >>>',this.filieres[0]._id);
  
    // console.log(res)
      },
      err =>{
      console.log(err);
    }
  )
}



// update userform with user values
editFiliere(filiere: Filiere) {
  
  console.log("ss : ",filiere);
  this.filiere = filiere;
  this.FiliereDialog = true;
  this.filiereForm.patchValue({
    code : filiere.code,
    libelle : filiere.libelle,
   });
   console.log('filiereform',this.filiereForm);
   
}




// map userform with new data
mapValues() {
  //this.etudiant.nom = this.etudiantForm.value.nom;
  //this.etudiant.prenom = this.etudiantForm.value.prenom;
  //this.etudiant.cne = this.etudiantForm.value.cne;
 }

 



 // Submit Edit user Form
submitEditfiliereForm(filiereForm : FormGroup ,filiereId : String){
  
  
  this.editFiliereForm = filiereForm.value;
  const editData= {
     id :   filiereId ,
     code :  this.editFiliereForm.code,
     libelle : this.editFiliereForm.libelle
  }
  this.submitted = true;
  console.log(filiereForm)
    if (filiereForm.invalid) {
      this.validateAllFormFields(this.filiereForm); // Triger etudiantForm validation
      this.toastr.error('Veuillez remplir tous les champs requis');
    } else {
       this.filiereService.editFiliereForm(editData).subscribe((data) =>{
       this.FiliereDialog = false;
       window.location.reload();
       this.toastr.success("La filiere a été modifié avec succès");
    }),
    (err: any) =>{
      this.toastr.error("La filiere n'a pas été modifié");
       console.log(err);
     }
    }
     
  }

 

  

  // Submit Create user Form
  submitCreateetudiantForm(newFiliereForm : FormGroup){
    
    //console.log('newUserForm >>>',newUserForm.value);
    console.log(newFiliereForm.value)
    
    this.CreateNewFiliere = newFiliereForm.value;
    const createDatafiliere = {
       code :  this.CreateNewFiliere.code,
       libelle : this.CreateNewFiliere.libelle,
    }
  
    this.submitted = true;
      if (newFiliereForm.invalid) {
        this.validateAllFormFields(this.newFiliereForm); // Triger userForm validation
        this.toastr.error('Veuillez remplir tous les champs requis');
      } else {
         this.filiereService.createFilieretForm(createDatafiliere).subscribe((data) =>{
         this.FiliereDialog = false;
         window.location.reload();
         this.toastr.success("Le filiere a été ajouté avec succès");
      }),
      (err: any) =>{
        this.toastr.error("La filiere n'a pas été ajouté");
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

  createNewFiliere(){
    this.newFiliereDialog = true;
  }

  hideDialog() {
    this.FiliereDialog = false;
    this.submitted = false;
  }

  hideEtudiantDialog() {
    this.newFiliereDialog = false;
    this.submitted = false;
  }

  
  //Global Search
  onRowSelect(event : any) {
    this.newFiliere = false;
    this.filiere = this.cloneUser(event.data);
    this.displayDialog = true;
}

cloneUser(e: Filiere): Filiere {

  for (let prop in e) {
    // this.filiere[prop] = e[prop];
  }
  return this.filiere;

}

getEventValue($event:any) :string {
  return $event.target.value;
} 
  

}
