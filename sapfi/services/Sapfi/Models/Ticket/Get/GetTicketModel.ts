export default interface GetTicketModel {
  id: number;
  number: string;
  issueDate: Date;
  linePosition: number;
  waitingTime: number;
  calledAt: Date;
  companyId: number;
  companyTradingName: string;
}
