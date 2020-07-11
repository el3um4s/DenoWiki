// Copyright 2020 Samuele de Tomasi. All rights reserved. MIT license.

import {
  WikiSearch_Params,
  WikiParse_Params,
} from "./interface.ts";

export const defaultParams_WikiSearch: WikiSearch_Params = {
  language: "en",
  url: "wikipedia.org/w/api.php",
  action: "query",
  list: "search",
  srsearch: "Hello World",
  srlimit: 500,
  srprop: "size|wordcount|timestamp|snippet",
  utf8: "",
  format: "json",
  origin: "*",
};

export const defaultParams_WikiParse: WikiParse_Params = {
  language: "en",
  url: "wikipedia.org/w/api.php",
  action: "parse",
  title: "",
  pageid: 0,
  prop: "wikitext|text",
  format: "json",
  redirects: true,
  origin: "*",
};
