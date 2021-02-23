import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { CompetitionsComponent } from './competitions.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataproviderService } from '../dataprovider.service';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('CompetitionsComponent', () => {
  let component: CompetitionsComponent;
  let fixture: ComponentFixture<CompetitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionsComponent ],
      providers :[    
        {provide: APP_BASE_HREF, useValue: '/'},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef , useValue: {} },
        DataproviderService],
      imports: [
        RouterModule.forRoot([]),
        MatDialogModule,
        HttpClientModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
