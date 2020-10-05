import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreaNaturaleService {

  constructor() { }

  getAreeNaturali(){
    return [
      {"id":1, "name":"AreaNaturale1", "description": "descrizione1"},
      {"id":1, "name":"AreaNaturale2", "description": "descrizione2"},
      {"id":1, "name":"AreaNaturale3", "description": "descrizione3"},
      {"id":1, "name":"AreaNaturale4", "description": "descrizione4"},
      {"id":1, "name":"AreaNaturale5", "description": "descrizione5"}
    ]
  }
}
