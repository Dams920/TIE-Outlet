import { TestBed } from '@angular/core/testing';

import { GestionGamesService } from './gestion-games.service';

describe('GestionGamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionGamesService = TestBed.get(GestionGamesService);
    expect(service).toBeTruthy();
  });
});
