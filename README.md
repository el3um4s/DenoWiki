# DenoWiki

[![GitHub license](https://img.shields.io/github/license/el3um4s/DenoWiki.svg)](https://github.com/el3um4s/DenoWiki/blob/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/el3um4s/DenoWiki.svg)](https://GitHub.com/el3um4s/DenoWiki/tags/)
[![HitCount](http://hits.dwyl.com/el3um4s/DenoWiki.svg)](http://hits.dwyl.com/el3um4s/DenoWiki)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/raw.githubusercontent.com/el3um4s/DenoWiki/master/mod.ts)
[![deno.land](https://img.shields.io/badge/deno.land-1.2.0-blue)](https://deno.land/x/denowiki)

A simple API for DenoJS to query Wikipedia and parse the results.

### Usage

```typescript
import * as wiki from "https://deno.land/x/denowiki/mod.ts";

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

Require `deno` (obviously) and `--allow-net` permission.

There are 2 demos available. The first demo queries Wikipedia and print the first result

```
deno run --allow-net .\demo_cmd.ts milan en false
deno run --allow-net .\demo_cmd.ts "doctor who" en true
```

The second demo searches a list of people and return how many exist in Wikipedia

```
deno run --allow-net .\demo_array.ts
```

You can run the demos directly from the repository with the commands:

```
deno run --allow-net https://deno.land/x/denowiki/demo_cmd.ts milan en false
deno run --allow-net https://deno.land/x/denowiki/demo_cmd.ts "doctor who" en true
deno run --allow-net https://raw.githubusercontent.com/el3um4s/DenoWiki/master/demo_array.ts
```

### API: wikiSearch

* **function wikiSearch(options): Promise<WikiSearch_Query>** : _Search for a term on Wikipedia and return the corresponding pages (max 500)_
* **function getPageId(wikiJSON: WikiSearch_Query, position): number** : _Returns the pageID number of Wikipedia referring to the searched term_
* **function getSearchTitle(wikiJSON: WikiSearch_Query, position): string** : _Returns the Title of Wikipedia referring to the searched term_
* **function getNumberResults(wikiJSON: WikiSearch_Query): number** : _Returns the total number of matches found for the search term. May be bigger than the results returned by wikiSearch(options)_
* **function getNumberResultsListed(wikiJSON: WikiSearch_Query): number** : _Returns the number of results found by wikiSearch(options)_
* **function getSuggestion(wikiJSON: WikiSearch_Query): string** : _Returns the suggested term related to the searched term_
* **function hasResult(wikiJSON: WikiSearch_Query): boolean** : _TRUE if there are results for the searched term_
* **function hasSuggestion(wikiJSON: WikiSearch_Query): boolean** : _TRUE if there are suggested searches related to the searched term_
* **function wikiSearchQuery(options): string** : _Returns the url address to be used as the source to obtain the information_

### API: wikiParse

* **function wikiParse(options): Promise<WikiParse_Query>** : _Returns the contents of a Wikipedia page_
* **function getWikiText(wikiPage: WikiParse_Query): string** : _Returns the original wikitext._
* **function getHTMLText(wikiPage: WikiParse_Query): string** : _Returns the parsed text of the wikitext._
* **function getPageTitle(wikiPage: WikiParse_Query): string** : _Returns the Title of Wikipedia referring to the page searched_
* **function wikiParseQuery(options): string**: _Returns the url address to be used as the source to obtain the information_
