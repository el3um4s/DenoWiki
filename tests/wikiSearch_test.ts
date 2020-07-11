// Copyright 2020 Samuele de Tomasi. All rights reserved. MIT license.

import {
  assert,
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

import * as wiki from "../mod.ts";

Deno.test("wikiSearchQuery: random parameters", (): void => {
  const params = {
    language: "it",
    url: "wiki",
    action: "test",
    list: "alpha",
    srsearch: "ciao mondo",
    srlimit: 9,
    srprop: "one|two|four",
    utf8: "",
    format: "random",
    origin: "mars",
  };
  const resultTest = wiki.wikiSearchQuery(params);
  const resultCorrect =
    `https://${params.language}.${params.url}?action=${params.action}&list=${params.list}&srsearch=${params.srsearch}&srlimit=${params.srlimit}&srprop=${params.srprop}&utf8=${params.utf8}&format=${params.format}&origin=${params.origin}`;
  assertEquals(resultTest, resultCorrect);
});

Deno.test("wikiSearchQuery: find doctor", (): void => {
  const params = {
    language: "it",
    srsearch: "doctor who",
    srlimit: 6,
  };
  const resultTest = wiki.wikiSearchQuery(params);
  const resultCorrect =
    `https://${params.language}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${params.srsearch}&srlimit=${params.srlimit}&srprop=size|wordcount|timestamp|snippet&utf8=&format=json&origin=*`;
  assertEquals(resultTest, resultCorrect);
});

Deno.test("wikiSearch: ok", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor who",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: boolean = !!wikiSearch && !!wikiSearch.query;
  assert(result);
});

Deno.test("wikiSearch: error", async (): Promise<void> => {
  const params = {
    language: "italian",
    srsearch: "doctor who",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: boolean = !!wikiSearch && !!wikiSearch.query;
  assert(!result);
});

Deno.test("hasSuggestion: false", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor who",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: boolean = wiki.hasSuggestion(wikiSearch);
  await assert(!result);
});

Deno.test("hasSuggestion: true", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor whho",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: boolean = wiki.hasSuggestion(wikiSearch);
  await assert(result);
});

Deno.test("getSuggestion: doctor whho", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor whho",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: string = wiki.getSuggestion(wikiSearch);
  await assertEquals(result, "doctor who");
});

Deno.test("getSuggestion: ''", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor who",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: string = wiki.getSuggestion(wikiSearch);
  await assertEquals(result, "");
});

Deno.test("hasResult(doctor who): true", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor who",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: boolean = wiki.hasResult(wikiSearch);
  await assert(result);
});

Deno.test("hasResult(doctor): true", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: boolean = wiki.hasResult(wikiSearch);
  await assert(result);
});

Deno.test("hasResult(doctor whho): false", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor whho",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: boolean = wiki.hasResult(wikiSearch);
  await assert(!result);
});

Deno.test("hasResult(doctorsadfsgfhgcjhgkhhjkjh): false", async (): Promise<
  void
> => {
  const params = {
    language: "it",
    srsearch: "doctorsadfsgfhgcjhgkhhjkjh",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: boolean = wiki.hasResult(wikiSearch);
  await assert(!result);
});

Deno.test("getNumberResults(doctor who): >0", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor who",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: number = wiki.getNumberResults(wikiSearch);
  await assert(result > 0);
});

Deno.test("getNumberResults(doctor whho): 0", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor whho",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: number = wiki.getNumberResults(wikiSearch);
  await assertEquals(result, 0);
});

Deno.test("getNumberResultsListed(doctor whho): 10", async (): Promise<
  void
> => {
  const params = {
    language: "it",
    srsearch: "doctor who",
    srlimit: 10,
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: number = wiki.getNumberResultsListed(wikiSearch);
  await assertEquals(result, 10);
});

Deno.test("getNumberResultsListed(doctor whho): 50", async (): Promise<
  void
> => {
  const params = {
    language: "it",
    srsearch: "doctor who",
    srlimit: 50,
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: number = wiki.getNumberResultsListed(wikiSearch);
  await assertEquals(result, 50);
});

Deno.test("getNumberResultsListed(doctor whho): 500", async (): Promise<
  void
> => {
  const params = {
    language: "it",
    srsearch: "doctor who",
    srlimit: 500,
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: number = wiki.getNumberResultsListed(wikiSearch);
  await assertEquals(result, 500);
});

Deno.test("getNumberResultsListed(tex willer): <500", async (): Promise<
  void
> => {
  const params = {
    language: "it",
    srsearch: "tex willer",
    srlimit: 500,
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: number = wiki.getNumberResultsListed(wikiSearch);
  await assert(result < 500);
});

Deno.test("getPageId(doctor who): 67166", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor who",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: number = wiki.getPageId(wikiSearch);
  await assertEquals(result, 67166);
});

Deno.test("getPageId(doctor whho): 0", async (): Promise<void> => {
  const params = {
    language: "it",
    srsearch: "doctor whho",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: number = wiki.getPageId(wikiSearch);
  await assertEquals(result, 0);
});

Deno.test("getPageId(doctor who, 100000000): 0 - index too high", async (): Promise<
  void
> => {
  const params = {
    language: "it",
    srsearch: "doctor who",
  };
  const wikiSearch: wiki.WikiSearch_Query = await wiki.wikiSearch(params);
  const result: number = wiki.getPageId(wikiSearch, 100000000);
  await assertEquals(result, 0);
});
