import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';


@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.page.html',
  styleUrls: ['./create-person.page.scss'],
})
export class CreatePersonPage implements OnInit {
  personForm: FormGroup;
  edit = false;
  titulo;
  idToEdit;
  constructor(private formBuilder: FormBuilder, private nav: NavController, private db: DatabaseService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.edit = true;
        this.idToEdit = this.router.getCurrentNavigation().extras.state.person.id
        this.personForm = this.formBuilder.group({
          nombre: [this.router.getCurrentNavigation().extras.state.person.nombre, [Validators.required]],
          edad: [this.router.getCurrentNavigation().extras.state.person.edad, []],
          genero: [this.router.getCurrentNavigation().extras.state.person.genero, []],
          color_ojos: [this.router.getCurrentNavigation().extras.state.person.color_ojos, [Validators.required]],
          color_pelo: [this.router.getCurrentNavigation().extras.state.person.color_pelo, [Validators.required]],
          detalles: [this.router.getCurrentNavigation().extras.state.person.detalles, []]
        });
      } else {
        this.edit = false;
        this.personForm = this.formBuilder.group({
          nombre: ['', [Validators.required]],
          edad: ['', []],
          genero: ['', []],
          color_ojos: ['', [Validators.required]],
          color_pelo: ['', [Validators.required]],
          detalles: ['', []]
        });
      }
    });


  }
  ngOnInit() { }
  ionViewDidEnter() {
    if (this.edit) {
      this.titulo = "Editar Persona:"
    } else {
      this.titulo = "Añadir Persona:"
    }
  }

  personSubmit() {
    console.log(this.personForm.value)
    if (this.edit) {
      this.db.addGenero(this.personForm.value.genero)
      this.db.updatePeople(this.idToEdit, this.personForm.value);
    } else {
      if (this.personForm.value.genero != undefined || this.personForm.value.genero != null || this.personForm.value.genero != "") {
        this.db.addGenero(this.personForm.value.genero)
        this.db.addPeople(this.personForm.value);
      } else {
        this.db.addPeople(this.personForm.value)
      }
    }

    this.close();
  }

  close() {
    this.personForm.reset;
    this.nav.pop();
  }

}
