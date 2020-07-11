# DenoWiki

[![GitHub license](https://img.shields.io/github/license/el3um4s/DenoWiki.svg)](https://github.com/el3um4s/DenoWiki/blob/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/el3um4s/DenoWiki.svg)](https://GitHub.com/el3um4s/DenoWiki/tags/)
[![HitCount](http://hits.dwyl.com/el3um4s/DenoWiki.svg)](http://hits.dwyl.com/el3um4s/DenoWiki)


A simple API for DenoJS to query Wikipedia and parse the results.

### Usage

```typescript
import * as wiki from "https://raw.githubusercontent.com/el3um4s/DenoWiki/master/mod.ts";

const wikiSearchResult: wiki.WikiSearch_Query = await wiki.wikiSearch(
  { language: "en", srsearch: "doctor who", srlimit: 15 },
);
const pageID: number = wiki.getPageId(wikiSearchResult);
const wikiPage: wiki.WikiParse_Query = await wiki.wikiParse(
    { pageid: pageID, language: "en", prop: "wikitext|text" },
  );
const text: string = wiki.getWikiText(wikiPage);

console.log(text);
```

This module use the Wikipedia [API:Search](https://www.mediawiki.org/wiki/API:Search) and [API:Parsing wikitext](https://www.mediawiki.org/wiki/API:Parsing_wikitext).

Require `node` (obviously) and `--allow-net` permission.

There are 2 demos available. The first demo can query Wikipedia and print the first result

```
deno run --allow-net .\demo_cmd.ts milan en false
deno run --allow-net .\demo_cmd.ts "doctor who" en true
```

The second demo can search a list of people and return how many exist in Wikipedia

```
deno run --allow-net .\demo_array.ts
```

### API: wikiSearch

**function getNumberResults(wikiJSON: WikiSearch_Query): number**
    May be greater than the results returned by wikiSearch(options)

**function getNumberResultsListed(wikiJSON: WikiSearch_Query): number**
    Returns the number of results found by wikiSearch(options)

**function getPageId(wikiJSON: WikiSearch_Query, position): number**
    Returns the pageID number of Wikipedia referring to the term searched

**function getSearchTitle(wikiJSON: WikiSearch_Query, position): string**
    Returns the Title of Wikipedia referring to the term searched

**function getSuggestion(wikiJSON: WikiSearch_Query): string**
    Returns the suggested term related to the searched term

**function hasResult(wikiJSON: WikiSearch_Query): boolean**
    TRUE if there are results for the search term

**function hasSuggestion(wikiJSON: WikiSearch_Query): boolean**
    TRUE if there are suggested searches related to the term searched

**function wikiSearch(options): Promise<WikiSearch_Query>**
    const wikiJSON = await wiki.wikiSearch( { language: en, srsearch: "hello world", srlimit: 5 } );

**function wikiSearchQuery(options): string**
    const wikiSearchQuery = await wiki.wikiSearchQuery( { language: "en", srsearch: "hello world", srlimit: 5 } );

### API: wikiParse

**function getHTMLText(wikiPage: WikiParse_Query): string**
    Returns the parsed text of the wikitext.

**function getPageTitle(wikiPage: WikiParse_Query): string**
    Returns the Title of Wikipedia referring to the page searched

**function getWikiText(wikiPage: WikiParse_Query): string**
    Returns the original wikitext.

function wikiParse(options): Promise<WikiParse_Query>
     const wikiPageByTitle = await wiki.wikiParse( { title: '"Hello, World!" program', language: "en" } );

function wikiParseQuery(options): string
     const wikiParseQueryByTitle = await wiki.wikiSearchQuery( { title: '"Hello, World!" program', language: "en" } );
