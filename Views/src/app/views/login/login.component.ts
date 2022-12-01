import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../providers/auth.service/auth-service.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formData: any ;
  loggedUser: any;

  constructor(private authService: AuthServiceService, private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.formData = {};
  }

  login(formData : any) {
    
    console.log(formData)

    if(!formData.email || !formData.password){
      this.toastr.error('Veuillez remplir tous les champs requis');
    }
    const  user = {
     email: formData.email,
     password: formData.password,
    }
    
    this.authService.signIn(user).subscribe((res :any) => {
      if (res == null){
        this.toastr.error("L'e-mail ou le mot de passe est incorrect");
      }
      console.log("data : ",res.data);
      this.loggedUser = res.data;
      localStorage.setItem('access_token',res.data.token);
      localStorage.setItem('loggedUser',JSON.stringify(this.loggedUser));
      localStorage.setItem('loggedUserUsername',res.data.user.username);
      localStorage.setItem('loggedUserId',res.data.user._id);
      this.router.navigate(['dashboard'])
    },
    (err) => {
      this.toastr.error('Les informations de connexion sont incorrectes');
      console.log(err);
    });
    
}

}
