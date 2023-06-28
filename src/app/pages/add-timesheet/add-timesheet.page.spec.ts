import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTimesheetPage } from './add-timesheet.page';

describe('AddTimesheetPage', () => {
  let component: AddTimesheetPage;
  let fixture: ComponentFixture<AddTimesheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTimesheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTimesheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
