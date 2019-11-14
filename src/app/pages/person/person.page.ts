import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {
  persona;
  
  constructor(private route: ActivatedRoute, private router: Router,private nav : NavController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.persona = this.router.getCurrentNavigation().extras.state.person;
      }
    });
   }

  ngOnInit() {
  }

  close(){
    this.nav.pop();
  }

}
