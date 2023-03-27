export type ApiResponseError = {
  error: ApiError;
};

export type ApiError = {
  statusCode: number;
  message: string;
};

export type PageBuilderFrontendApiError = {
  status: number;
  title: string;
  detail: string;
};

export type ForgeApiError = {
  status: number;
  title: string;
  type: string;
  traceId: string;
};