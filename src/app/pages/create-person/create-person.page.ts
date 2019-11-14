import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database/database.service';


@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.page.html',
  styleUrls: ['./create-person.page.scss'],
})
export class CreatePersonPage implements OnInit {
  personForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private nav: NavController, private db: DatabaseService) {
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

  personSubmit() {
    console.log(this.personForm.value)
    if (this.personForm.value.genero != undefined || this.personForm.value.genero != null || this.personForm.value.genero != "") {
      this.db.addGenero(this.personForm.value.genero)
      this.db.addPeople(this.personForm.value);
    } else {
      this.db.addPeople(this.personForm.value)
    }
    this.close();
  }

  close() {
    this.personForm.reset;
    this.nav.pop();
  }

}
