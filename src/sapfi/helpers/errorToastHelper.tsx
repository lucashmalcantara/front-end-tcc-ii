import { showErrorToast } from "../components/Toast";
import ErrorModel from "../services/Sapfi/Models/Core/ErrorModel";

export function showErrorToastFromHttpResponse(httpResponse : any){
      let errorModel: ErrorModel = httpResponse.response.data;
      showErrorToast(errorModel.message);
}