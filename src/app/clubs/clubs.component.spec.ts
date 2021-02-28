import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ClubsComponent } from './clubs.component';
import { HttpClientModule } from '@angular/common/http';
import { DataproviderService } from '../dataprovider.service';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClubsComponent', () => {
  let component: ClubsComponent;
  let fixture: ComponentFixture<ClubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubsComponent ],
      providers : [ DataproviderService],
      imports: [
        RouterModule.forRoot([]),
        // HttpClientModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
