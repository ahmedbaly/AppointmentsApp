import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DataproviderService } from './dataprovider.service';

describe('DataproviderService', () => {
  let service: DataproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [
        HttpClientModule
      ]
    }).compileComponents();
    
    service = TestBed.inject(DataproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
