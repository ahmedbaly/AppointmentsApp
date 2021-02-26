import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataproviderService } from '../dataprovider.service';

import { GameformComponent } from './gameform.component';

describe('GameformComponent', () => {
  let component: GameformComponent;
  let fixture: ComponentFixture<GameformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers : [    
        {provide: APP_BASE_HREF, useValue: '/'},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef , useValue: {} },
        DataproviderService],
      declarations: [ GameformComponent ],
      imports : [
        RouterModule.forRoot([]),
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule,
        NoopAnimationsModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
