import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service'

@Injectable({
  providedIn: 'root'
})
export class EtudiantServiceService {

  constructor(public api: ApiService) {}

  getEtudiants(params?: any) {
    return this.api.get('etudiant/list');
  }
  editEtudiantForm(params?: any) {
    return this.api.post('etudiant/update', params);
  }
  createEtudiantForm(params?: any) {
    return this.api.post('etudiant/save', params);
  }
  findetudiantById(etudiantId :any) {
    return this.api.get(`etudiant/${etudiantId}`);
  }
}
