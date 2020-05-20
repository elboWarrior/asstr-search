class HtmlError extends Error {
  constructor(statusCode: number, statusText: string, message: string) {
    super(message);
    this.name = 'HtmlError';
    this.message = `Status: ${statusCode}\n ${message} \n Reason: ${statusText}`;
  }
}

export default HtmlError;
