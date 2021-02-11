export type WikiSearch_Query = import("./lib/interface.ts").WikiSearch_Query;
export type WikiSearch_Params = import("./lib/interface.ts").WikiSearch_Params;
export type WikiParse_Query = import("./lib/interface.ts").WikiParse_Query;
export type WikiParse_Params = import("./lib/interface.ts").WikiParse_Params;

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
