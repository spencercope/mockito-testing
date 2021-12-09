



export interface TheEvent {
  id: number;
  type: string;
  candidateId: string;
}


export class Checker {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  async processBackgroundCheckReportComplete(
      event: TheEvent,
  ): Promise<boolean> {
    try {
      console.log('starting...');
      console.log(event.candidateId);
      const user = await this.userService.findByCandidateId(event.candidateId);
      console.log('not getting here');
    } catch (e) {
      console.log('failed to process');
      console.log(e);
      return false;
    }
    return true;
  }
}

export class UserService {
  findByCandidateId(candidateId: string): Promise<any> {
    return null;
  }
}