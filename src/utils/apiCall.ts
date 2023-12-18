import { enqueueSnackbar } from 'notistack';
import { IError, IErrorResponse, IResponse } from '../models/IAxiosResponse.js';

export async function apiCall(
  api:  Promise<unknown>,
  {
    ifSuccess,
    ifFailed,
  }: {
    ifSuccess: (data: IResponse) => void;
    ifFailed: (err: IError<IErrorResponse>) => void;
  },
) {
  try {
    const res = await api;
    const temp = res as IResponse;
    if (temp.status === undefined || temp.data === undefined) {
      ifFailed(res as IError<IErrorResponse>);
    } else {
      ifSuccess((res as { data: IResponse }).data as IResponse);
    }
  } catch (err) {
    console.log(err);
    enqueueSnackbar(` Get error: ${(err as Error).message}`, {
      variant: 'error',
    });
  }
}