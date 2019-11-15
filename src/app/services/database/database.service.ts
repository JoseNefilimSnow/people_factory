import {
  Platform
} from '@ionic/angular';
import {
  Injectable
} from '@angular/core';
import {
  SQLite,
  SQLiteObject
} from '@ionic-native/sqlite/ngx';
import {
  BehaviorSubject
} from 'rxjs';
import {
  UtilsService
} from '../utils/utils.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private plt: Platform, private sqlite: SQLite, private utils: UtilsService) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'people.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {

          db.executeSql('CREATE TABLE IF NOT EXISTS generos(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR NOT NULL);', [])
            .catch(e => console.log(e));
          db.executeSql('CREATE TABLE IF NOT EXISTS people(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR NOT NULL,edad INTEGER,genero VARCHAR,color_ojos VARCHAR NOT NULL,color_pelo VARCHAR NOT NULL,detalles VARCHAR);', [])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));


          this.database = db;
          this.dbReady.next(true);
        })
        .catch(e => console.log(e));


    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  loadGenero() {
    return this.database.executeSql('SELECT * FROM generos ', []);
  }

  addGenero(genero) {

    this.loadGenero().then(data => {

      let generoF = genero.substring(0, 1).toUpperCase() + genero.substring(1, genero.length).toLowerCase();
      let añadir = true;

      for (var i = 0; i < data.rows.length; i++) {
        if (data.rows.item(i).nombre === generoF) {
          añadir = false;
          break;
        }
      }

      if (añadir) {
        this.database.executeSql('INSERT INTO generos (nombre) VALUES (?)', [genero])
      }
    })

  }

  loadPeople() {
    return this.database.executeSql('SELECT * FROM people ', []);
  }

  addPeople(person_obj) {
    let generoF = person_obj.genero.substring(0, 1).toUpperCase() + person_obj.genero.substring(1, person_obj.genero.length).toLowerCase();
    return this.database.executeSql('INSERT INTO people (nombre,edad,genero,color_ojos,color_pelo,detalles) VALUES (?,?,?,?,?,?)', [person_obj.nombre, person_obj.edad, generoF, person_obj.color_ojos, person_obj.color_pelo, person_obj.detalles]).catch(err => console.log(err))
  }

  updatePeople(id, person_obj) {
    return this.database.executeSql(`UPDATE people SET nombre = ?,edad = ?,genero = ?,color_ojos = ?,color_pelo = ?,detalles= ? WHERE id = ${id}`, [person_obj.nombre, person_obj.edad, person_obj.genero, person_obj.color_ojos, person_obj.color_pelo, person_obj.detalles]).catch(err => console.log(err));
  }

  deletePeople(id) {
    return this.database.executeSql('DELETE FROM people WHERE id = ?', [id])
  }

  deleteAllPeople() {
    this.database.executeSql('SELECT * FROM people', []).then(data => {
      let count = 0;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.deletePeople(data.rows.item(i).id)
          count++;
        }
      }
      this.utils.presentAlert("", "Se han Borrado " + count + " registros", [{
        text: "Entendido",
      }]);
    })
  }

}