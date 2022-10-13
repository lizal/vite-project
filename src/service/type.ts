export interface ResType<T> {
  code: number;
  success: boolean;
  result?: T;
  message: string;
  errorMessage?: string;
}
