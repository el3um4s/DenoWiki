// Copyright 2020 Samuele de Tomasi. All rights reserved. MIT license.
// Created with https://jvilk.com/MakeTypes/

export interface WikiSearch_Query {
  batchcomplete: string;
  continue: Continue;
  curtimestamp: string;
  query: Query;
}
interface Continue {
  sroffset: number;
  continue: string;
}
interface Query {
  searchinfo: Searchinfo;
  search?: (SearchEntity)[] | null;
}
interface Searchinfo {
  totalhits: number;
  suggestion: string;
  suggestionsnippet: string;
}
interface SearchEntity {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
}

export interface WikiSearch_Params {
  language: string;
  url: string;
  action: string;
  list: string;
  srsearch: string;
  srlimit: number;
  srprop: string;
  utf8: string;
  format: string;
  origin: string;
}

export interface WikiParse_Query {
  parse: Parse;
}
interface Parse {
  title?: string;
  pageid?: number;
  redirects?: (null)[] | null;
  text?: TextOrWikitext;
  wikitext?: TextOrWikitext;
}
interface TextOrWikitext {
  "*": string;
}

export interface WikiParse_Params {
  language: string;
  url: string;
  action: string;
  title?: string;
  pageid?: number;
  prop: string;
  format: string;
  redirects: boolean;
  origin: string;
}
