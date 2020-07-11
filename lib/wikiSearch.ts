// Copyright 2020 Samuele de Tomasi. All rights reserved. MIT license.

import {
  WikiSearch_Query,
  WikiSearch_Params,
} from "./interface.ts";

import { defaultParams_WikiSearch } from "./defaultParams.ts";

/** Search for a term on Wikipedia and return the corresponding pages (max 500)
 * Options can be used to customize parameters:
 *  language (default "en")
 *  srsearch: term to search (default "Hello World")
 *  srlimit: how many total pages to return (default 500)
 *  srprop: which pieces of information to get (default "size|wordcount|timestamp|snippet")
 *  
 *     const wikiJSON = await wiki.wikiSearch( { language: en, srsearch: "hello world", srlimit: 5 } );
 */
export async function wikiSearch(options = {}): Promise<WikiSearch_Query> {
  const query: string = wikiSearchQuery(options);
  let result = undefined;
  try {
    const wiki = await fetch(query);
    result = wiki.json();
  } catch (error) {
    const wiki = { isErr: true, messErr: error };
    result = JSON.stringify(wiki);
  }
  return result;
}

/** Returns the url address to be used as the source to obtain the information
 * 
 *     const wikiSearchQuery = await wiki.wikiSearchQuery( { language: "en", srsearch: "hello world", srlimit: 5 } );
 */
export function wikiSearchQuery(options = {}): string {
  const params: WikiSearch_Params = { ...defaultParams_WikiSearch, ...options };
  return `https://${params.language}.${params.url}?action=${params.action}&list=${params.list}&srsearch=${params.srsearch}&srlimit=${params.srlimit}&srprop=${params.srprop}&utf8=${params.utf8}&format=${params.format}&origin=${params.origin}`;
}

/** TRUE if there are suggested searches related to the searched term */
export function hasSuggestion(wikiJSON: WikiSearch_Query): boolean {
  return !!wikiJSON?.query?.searchinfo?.suggestion;
  // return !!wikiJSON.query.searchinfo.suggestion;
}

/** Returns the suggested term related to the searched term */
export function getSuggestion(wikiJSON: WikiSearch_Query): string {
  return hasSuggestion(wikiJSON) ? wikiJSON?.query?.searchinfo?.suggestion : "";
  // return hasSuggestion(wikiJSON) ? wikiJSON.query.searchinfo.suggestion : "";
}

/** TRUE if there are results for the searched term */
export function hasResult(wikiJSON: WikiSearch_Query): boolean {
  return wikiJSON?.query?.searchinfo?.totalhits > 0
  // try {
  //   return wikiJSON.query.searchinfo !== null &&
  //     wikiJSON.query.searchinfo !== undefined
  //     ? wikiJSON.query.searchinfo.totalhits > 0
  //     : false;
  // } catch (error) {
  //   return false;
  // }
}

/** Returns the total number of matches found for the searched term.
 * May be bigger than the results returned by wikiSearch(options)
*/
export function getNumberResults(wikiJSON: WikiSearch_Query): number {
  return +wikiJSON?.query?.searchinfo?.totalhits;
  // return +wikiJSON.query.searchinfo.totalhits;
}

/** Returns the number of results found by wikiSearch(options) */
export function getNumberResultsListed(wikiJSON: WikiSearch_Query): number {
  return wikiJSON?.query?.search?.length ? wikiJSON.query.search.length : 0;
  // try {
  //   return wikiJSON.query.search !== null && wikiJSON.query.search !== undefined
  //     ? wikiJSON.query.search.length
  //     : 0;
  // } catch (error) {
  //   return 0;
  // }
}

/** Returns the pageID number of Wikipedia referring to the searched term */
export function getPageId(
  wikiJSON: WikiSearch_Query,
  position = 0,
): number {
  // return wikiJSON?.query?.search ? wikiJSON.query.search[position].pageid : 0;
  try {
    return wikiJSON.query.search !== null && wikiJSON.query.search !== undefined
      ? wikiJSON.query.search[position].pageid
      : 0;
  } catch (error) {
    return 0;
  }
}
/** Returns the Title of Wikipedia referring to the searched term */
export function getSearchTitle(
  wikiJSON: WikiSearch_Query,
  position = 0,
): string {
  // return wikiJSON?.query?.search ? wikiJSON.query.search[position].title : "";
  try {
    return wikiJSON.query.search !== null && wikiJSON.query.search !== undefined
      ? wikiJSON.query.search[position].title
      : "";
  } catch (error) {
    return "";
  }
}
