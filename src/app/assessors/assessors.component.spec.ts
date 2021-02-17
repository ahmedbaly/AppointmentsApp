import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
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
        HttpClientModule
      ]
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
