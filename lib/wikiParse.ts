// Copyright 2020 Samuele de Tomasi. All rights reserved. MIT license.

import {
  WikiParse_Query,
  WikiParse_Params,
} from "./interface.ts";

import { defaultParams_WikiParse } from "./defaultParams.ts";

/** Returns the contents of a Wikipedia page
 * 
 *     const wikiPageByID = await wiki.wikiParse( { pageid: 13834, language: "en" } );
 *     const wikiPageByTitle = await wiki.wikiParse( { title: '"Hello, World!" program', language: "en" } );
 */
export async function wikiParse(options = {}): Promise<WikiParse_Query> {
  const query: string = wikiParseQuery(options);
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
 *     const wikiParseQueryByID = await wiki.wikiSearchQuery( { pageid: 13834, language: "en" } );
 *     const wikiParseQueryByTitle = await wiki.wikiSearchQuery( { title: '"Hello, World!" program', language: "en" } );
 */
export function wikiParseQuery(options = {}): string {
  const params: WikiParse_Params = { ...defaultParams_WikiParse, ...options };
  const titleOrId = params.title !== ``
    ? `title=${params.title}`
    : `pageid=${params.pageid}`;
  return `https://${params.language}.${params.url}?action=${params.action}&${titleOrId}&prop=${params.prop}&format=${params.format}&redirects=${params.redirects}&origin=${params.origin}`;
}

/** Returns the Title of Wikipedia referring to the page searched */
export function getPageTitle(wikiPage: WikiParse_Query): string {
  return wikiPage?.parse?.title
    ? wikiPage.parse.title
    : "ERROR - ID DON'T FOUND";
  // try {
  //   return wikiPage.parse.title !== null && wikiPage.parse.title !== undefined
  //     ? wikiPage.parse.title
  //     : "ERROR - ID DON'T FOUND";
  // } catch (error) {
  //   return "ERROR - ID DON'T FOUND";
  // }
}

/** Returns the original wikitext. */
export function getWikiText(wikiPage: WikiParse_Query): string {
  return wikiPage?.parse?.wikitext
    ? wikiPage.parse.wikitext["*"]
    : "ERROR - ID DON'T FOUND";
  // try {
  //   return wikiPage.parse.wikitext !== null &&
  //     wikiPage.parse.wikitext !== undefined
  //     ? wikiPage.parse.wikitext["*"]
  //     : "ERROR - ID DON'T FOUND";
  // } catch (error) {
  //   return "ERROR - ID DON'T FOUND";
  // }
}

/** Returns the parsed text of the wikitext. */
export function getHTMLText(wikiPage: WikiParse_Query): string {
  return wikiPage?.parse?.text
    ? wikiPage.parse.text["*"]
    : "ERROR - ID DON'T FOUND";
  // try {
  //   return wikiPage.parse.text !== null && wikiPage.parse.text !== undefined
  //     ? wikiPage.parse.text["*"]
  //     : "ERROR - ID DON'T FOUND";
  // } catch (error) {
  //   return "ERROR - ID DON'T FOUND";
  // }
}
