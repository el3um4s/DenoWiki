// Copyright 2020 Samuele de Tomasi. All rights reserved. MIT license.

import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import * as wiki from "../mod.ts";

Deno.test("wikiParseQuery: random parameters", (): void => {
  const params = {
    language: "it",
    url: "wiki",
    action: "test",
    pageid: 9,
    prop: "one|two|four",
    format: "random",
    redirects: false,
    origin: "mars",
  };
  const resultTest = wiki.wikiParseQuery(params);
  const resultCorrect =
    `https://${params.language}.${params.url}?action=${params.action}&pageid=${params.pageid}&prop=${params.prop}&format=${params.format}&redirects=${params.redirects}&origin=${params.origin}`;
  assertEquals(resultTest, resultCorrect);
});

Deno.test("wikiParseQuery: find doctor", (): void => {
  const params = {
    language: "it",
    pageid: 67166,
  };
  const resultTest = wiki.wikiParseQuery(params);
  const resultCorrect =
    `https://${params.language}.wikipedia.org/w/api.php?action=parse&pageid=${params.pageid}&prop=wikitext|text&format=json&redirects=true&origin=*`;
  assertEquals(resultTest, resultCorrect);
});

Deno.test("wikiParse: ok", async (): Promise<void> => {
  const params = {
    language: "it",
    pageid: 67166,
  };
  const wikiParse: wiki.WikiParse_Query = await wiki.wikiParse(params);
  const result: boolean = !!wikiParse && !!wikiParse.parse;
  assert(result);
});

Deno.test("wikiParse: error", async (): Promise<void> => {
  const params = {
    language: "it",
    pageid: 0,
  };
  const wikiParse: wiki.WikiParse_Query = await wiki.wikiParse(params);
  const result: boolean = !!wikiParse && !!wikiParse.parse;
  assert(!result);
});

Deno.test("getPageTitle(67166): Doctor Who", async (): Promise<void> => {
  const params = {
    language: "it",
    pageid: 67166,
  };
  const wikiParse: wiki.WikiParse_Query = await wiki.wikiParse(params);
  const result: string = wiki.getPageTitle(wikiParse);
  await assertEquals(result, "Doctor Who");
});

Deno.test("getPageTitle(2835): Not Doctor Who", async (): Promise<void> => {
  const params = {
    language: "it",
    pageid: 2835,
  };
  const wikiParse: wiki.WikiParse_Query = await wiki.wikiParse(params);
  const result: string = wiki.getPageTitle(wikiParse);
  await assertNotEquals(result, "Doctor Who");
});

Deno.test("getPageTitle(0): ERROR - ID DON'T FOUND", async (): Promise<
  void
> => {
  const params = {
    language: "it",
    pageid: 0,
  };
  const wikiParse: wiki.WikiParse_Query = await wiki.wikiParse(params);
  const result: string = wiki.getPageTitle(wikiParse);
  await assertEquals(result, "ERROR - ID DON'T FOUND");
});
