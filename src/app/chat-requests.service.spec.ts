import { TestBed } from '@angular/core/testing';

import { ChatRequestsService } from './chat-requests.service';

describe('ChatRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatRequestsService = TestBed.get(ChatRequestsService);
    expect(service).toBeTruthy();
  });
});
