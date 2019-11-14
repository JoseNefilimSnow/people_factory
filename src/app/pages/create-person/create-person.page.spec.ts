import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePersonPage } from './create-person.page';

describe('CreatePersonPage', () => {
  let component: CreatePersonPage;
  let fixture: ComponentFixture<CreatePersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePersonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
