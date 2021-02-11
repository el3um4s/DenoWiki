// Copyright 2020 Samuele de Tomasi. All rights reserved. MIT license.

export type {
  WikiSearch_Query,
  WikiSearch_Params,
  WikiParse_Query,
  WikiParse_Params,
} from "./lib/interface.ts";

export {
  wikiSearch,
  hasSuggestion,
  hasResult,
  getSuggestion,
  getNumberResults,
  getPageId,
  getSearchTitle,
  wikiSearchQuery,
  getNumberResultsListed,
} from "./lib/wikiSearch.ts";

export {
  wikiParse,
  wikiParseQuery,
  getPageTitle,
  getWikiText,
  getHTMLText,
} from "./lib/wikiParse.ts";
