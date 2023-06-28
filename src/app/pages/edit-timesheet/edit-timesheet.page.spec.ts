import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTimesheetPage } from './edit-timesheet.page';

describe('EditTimesheetPage', () => {
  let component: EditTimesheetPage;
  let fixture: ComponentFixture<EditTimesheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTimesheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTimesheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
