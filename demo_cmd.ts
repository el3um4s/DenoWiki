// Copyright 2020 Samuele de Tomasi. All rights reserved. MIT license.

import * as wiki from "./mod.ts";
import { WikiParse_Params, WikiParse_Query } from "./lib/interface.ts";

const search: string = Deno.args.length > 0 ? Deno.args[0] : "Milan";
const language: string = Deno.args.length > 1 ? Deno.args[1] : "en";
const showWikiPage: boolean = Deno.args.length > 2 && Deno.args[2] === "false"
  ? false
  : true;

console.log(`Searching ${search} in ${language} (show page: ${showWikiPage})`);
console.log(
  wiki.wikiSearchQuery({ language: language, srsearch: search, srlimit: 15 }),
);
const wikiSearchResult: wiki.WikiSearch_Query = await wiki.wikiSearch(
  { language: language, srsearch: search, srlimit: 15 },
);
const hasSuggestion: boolean = wiki.hasSuggestion(wikiSearchResult);
const hasResult: boolean = wiki.hasResult(wikiSearchResult);

console.log(
  "hasSuggestion",
  hasSuggestion,
  hasSuggestion ? wiki.getSuggestion(wikiSearchResult) : "",
);
console.log("hasResult", hasResult);

const logResult = (wikiSearchResult: wiki.WikiSearch_Query): string => {
  const numberResults: number = wiki.getNumberResultsListed(wikiSearchResult);
  let result: string = "";
  for (let position = 0; position < numberResults; position++) {
    const pageID: number = wiki.getPageId(wikiSearchResult, position);
    const title: string = wiki.getSearchTitle(wikiSearchResult, position);
    result += `
    ${position} - ID: ${pageID} - TITLE: ${title}`;
  }
  return result;
};

if (hasResult) {
  const pageID: number = wiki.getPageId(wikiSearchResult);
  const wikiPage: wiki.WikiParse_Query = await wiki.wikiParse(
    { pageid: pageID, language: language, prop: "wikitext|text" },
  );

  const text : string = wiki.getWikiText(wikiPage);
  console.log("result: ", wiki.getNumberResults(wikiSearchResult));
  console.log(logResult(wikiSearchResult));

  if (showWikiPage) {
    console.log("_______________________________________");
    console.log("WIKIPEDIA: ", wiki.getPageTitle(wikiPage));
    console.log("_______________________________________");
    console.log(text);
  }
}
