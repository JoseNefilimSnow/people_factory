import {
  Component,
  OnInit
} from '@angular/core';
import {
  DatabaseService
} from 'src/app/services/database/database.service';
import {
  UtilsService
} from 'src/app/services/utils/utils.service';
import {
  Router,
  NavigationExtras
} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  arrayGeneros;
  generoElegido= "todo";
  arrayPersonasDB;
  arrayPersonasDisplay;
  constructor(private db: DatabaseService, private utils: UtilsService, private router: Router) {}

  ionViewDidEnter() {
    this.arrayGeneros = [];
    this.arrayPersonasDB = [];
    this.arrayPersonasDisplay = [];

    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        // Coge generos de la base de datos
        this.db.loadGenero().then(data => {
          if (data.rows.length > 0) {

            for (var i = 0; i < data.rows.length; i++) {
              this.arrayGeneros.push(data.rows.item(i).nombre)
            }
          } else {
            this.utils.presentAlert("Atención", "La tabla generos está vacía", [{
              text: "Entendido"
            }])
          }
        })
        //Coge personas de la base de datos
        this.db.loadPeople().then(data => {
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              console.log(data.rows.item(i).genero)
              this.arrayPersonasDB.push({
                id: data.rows.item(i).id,
                nombre: data.rows.item(i).nombre,
                edad: data.rows.item(i).edad,
                genero: data.rows.item(i).genero,
                color_ojos: data.rows.item(i).color_ojos,
                color_pelo: data.rows.item(i).color_pelo,
                detalles: data.rows.item(i).detalles
              })
            }
            this.arrayPersonasDisplay = this.arrayPersonasDB;
          } else {
            this.utils.presentAlert("Atención", "La tabla personas está actualmente vacía", [{
              text: "Entendido"
            }])
          }
        })

      }
    })
  }

  filter() {
      this.arrayPersonasDisplay = [];
      if (this.generoElegido === "todo") {
        this.arrayPersonasDisplay = [];
        this.arrayPersonasDB = [];
        this.db.loadPeople().then(data => {
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              console.log(data.rows.item(i).genero)
              this.arrayPersonasDB.push({
                id: data.rows.item(i).id,
                nombre: data.rows.item(i).nombre,
                edad: data.rows.item(i).edad,
                genero: data.rows.item(i).genero,
                color_ojos: data.rows.item(i).color_ojos,
                color_pelo: data.rows.item(i).color_pelo,
                detalles: data.rows.item(i).detalles
              })
            }
            this.arrayPersonasDisplay = this.arrayPersonasDB;
          }
        })
            } else {
              for (let item of this.arrayPersonasDB) {
                if (item.genero === this.generoElegido) {
                  this.arrayPersonasDisplay.push(item);
                }
              }
            }
          }

          toDetails(index) {
            let params: NavigationExtras = {
              state: {
                person: this.arrayPersonasDisplay[index]
              }
            }
            this.router.navigate(["person"], params)
          }

          addP() {
            this.router.navigate(["create-person"])
          }
        }