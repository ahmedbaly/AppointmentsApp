import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataproviderService } from '../dataprovider.service';

import { AssessorsComponent } from './assessors.component';

describe('AssessorsComponent', () => {
  let component: AssessorsComponent;
  let fixture: ComponentFixture<AssessorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers : [DataproviderService],
      declarations: [ AssessorsComponent ],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
