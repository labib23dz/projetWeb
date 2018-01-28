import { TestBed, inject } from '@angular/core/testing';

import { GetFilesService } from './get-files.service';

describe('GetFilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetFilesService]
    });
  });

  it('should be created', inject([GetFilesService], (service: GetFilesService) => {
    expect(service).toBeTruthy();
  }));
});
