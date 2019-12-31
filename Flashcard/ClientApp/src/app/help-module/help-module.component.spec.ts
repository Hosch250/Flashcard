import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpModuleComponent } from './help-module.component';

describe('HelpModuleComponent', () => {
  let component: HelpModuleComponent;
  let fixture: ComponentFixture<HelpModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
