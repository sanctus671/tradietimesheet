import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimesheetDatePage } from './timesheet-date.page';

describe('TimesheetDatePage', () => {
  let component: TimesheetDatePage;
  let fixture: ComponentFixture<TimesheetDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetDatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimesheetDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
