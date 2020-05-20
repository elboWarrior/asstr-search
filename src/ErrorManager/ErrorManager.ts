import HtmlError from './HtmlError';

const ErrorManager = {
  throw(message: string, error?: Error) {
    const customError = new Error(message);
    if (error) {
      customError.name = error.name;
      customError.message = `${message}\n ${error.message}`;
    }
    throw customError;
  },
  throwHtmlError(statusCode: number, statusText: string, message: string) {
    throw new HtmlError(statusCode, statusText, message);
  },
};

export default ErrorManager;
