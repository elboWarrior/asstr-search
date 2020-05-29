interface InitialSearchParameters {
  search: string;
  begin: number;
  domain: string;
  appendquote_author?: string;
  appendquote_title?: string;
  append_summary?: string;
  append_chapter?: string;
  appendquote_universe?: string;
  append?: Array<string>;
  number: number;
  sample?: number;
  span: string;
}

export default InitialSearchParameters;
