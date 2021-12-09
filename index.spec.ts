import 'reflect-metadata';
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import {Checker, TheEvent, UserService} from "./index";

describe('BackgroundCheckService', function() {
  let service: Checker;
  let mockUserService: UserService;

  beforeEach(() => {
    mockUserService = mock<UserService>();
    service = new Checker(
        instance(mockUserService),
    );
  });

  afterEach(() => {
    service = null;
  });

  describe('test the event', () => {
    it('does what it should', async () => {
      const mockReportEvent = mock<TheEvent>();
      when(mockReportEvent.candidateId).thenReturn('123456');
      const mockUser = mock<any>();
      when(mockUserService.findByCandidateId(anything())).thenResolve(mockUser);

      const actual = await service.processBackgroundCheckReportComplete(
          instance(mockReportEvent),
      );

      expect(actual).toBeTruthy();
      verify(mockUserService.findByCandidateId(deepEqual('123456'))).once();
    });
  });
});
