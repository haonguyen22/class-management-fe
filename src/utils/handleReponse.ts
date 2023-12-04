import { IError, IErrorResponse, IResponse } from '../models/IAxiosResponse.js';

export function handleAxiosReponse(
  res: unknown,
  {
    ifSuccess,
    ifFailed,
  }: {
    ifSuccess: (response: IResponse) => void;
    ifFailed: (err: IError<IErrorResponse>) => void;
  },
): void {
  const temp = res as IResponse;
  if (temp.status === undefined || temp.data === undefined) {
    ifFailed(res as IError<IErrorResponse>);
  } else {
    ifSuccess(res as IResponse);
  }
}
