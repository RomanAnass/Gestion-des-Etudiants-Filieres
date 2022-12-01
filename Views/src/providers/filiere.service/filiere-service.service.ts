import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class FiliereServiceService {

  constructor(public api: ApiService) {}

  getFilieres(params?: any) {
    return this.api.get('filiere/list');
  }
  editFiliereForm(params?: any) {
    return this.api.post('filiere/update', params);
  }
  createFilieretForm(params?: any) {
    return this.api.post('filiere/save', params);
  }
  findfiliereById(filiereId :any) {
    return this.api.get(`filiere/${filiereId}`);
  }
}
