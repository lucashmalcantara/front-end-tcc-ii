export default interface GetTicketModel {
  id: number;
  number: string;
  issueDate: Date;
  linePosition: Number;
  waitingTime: Number;
  calledAt: Date;
  companyId: Number;
}
