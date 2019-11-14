import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database/database.service';


@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.page.html',
  styleUrls: ['./create-person.page.scss'],
})
export class CreatePersonPage implements OnInit {
  personForm: FormGroup;
  constructor(private formBuilder : FormBuilder,private nav :NavController,private db:DatabaseService) { 
    this.personForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      edad: ['', []],
      genero: ['', []],
      color_ojos: ['', [Validators.required]],
      color_pelo: ['', [Validators.required]],
      detalles: ['', []]
    });
  }

  ngOnInit() {
  }

  personSubmit(){
    console.log(this.personForm.value)
    if(this.personForm.value.genero!=undefined||this.personForm.value.genero!=null||this.personForm.value.genero!=""){
      this.db.addGenero(this.personForm.value.genero)
      let generoPH=this.personForm.value.genero.substring(0,1).toUpperCase()+this.personForm.value.genero.substring(1,this.personForm.value.genero.length).toLowerCase();
      this.db.addPeople({
        nombre:this.personForm.value.nombre,
        edad:this.personForm.value.edad,
        genero:generoPH,
        color_ojos:this.personForm.value.color_ojos,
        color_pelo:this.personForm.value.color_pelo,
        detalles:this.personForm.value.detalles
      })
    }else{
      this.db.addPeople(this.personForm.value)
    }
    this.close();
  }

  close(){
    this.personForm.reset;
    this.nav.pop();
  }

}
