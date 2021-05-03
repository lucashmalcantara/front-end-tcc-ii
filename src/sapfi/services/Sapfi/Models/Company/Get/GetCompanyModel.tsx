import GetCompanyAddressModel from "./GetCompanyAddressModel";

export default interface GetCompanyModel {
  id: number;
  tradingName: string;
  address: GetCompanyAddressModel;
}
