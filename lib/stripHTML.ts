const decode = function (text: string): string {
  return text.replace(
    /&#(\d+);/g,
    (match: string, dec: number) => String.fromCharCode(dec),
  );
};

export const convertHtmlToText = function (text: string): string {
  let returnText: string = "" + text;

  //-- remove BR tags and replace them with line break
  returnText = returnText.replace(/<br>/gi, "\n");
  returnText = returnText.replace(/<br\s\/>/gi, "\n");
  returnText = returnText.replace(/<br\/>/gi, "\n");

  //-- convert tag H1,..., H6 to # TITLE MARKDOWN
  returnText = returnText.replace(/<h1/gi, "# <h1>");
  returnText = returnText.replace(/<h2/gi, "## <h2");
  returnText = returnText.replace(/<h3/gi, "### <h3>");
  returnText = returnText.replace(/<h4/gi, "#### <h4>");
  returnText = returnText.replace(/<h5/gi, "##### <h5>");
  returnText = returnText.replace(/<h6/gi, "###### <h6>");

  //-- remove H tags but preserve what's inside of them
  returnText = returnText.replace(/<li/gi, " - <li");

  //-- remove P and A tags but preserve what's inside of them
  returnText = returnText.replace(/<p.*>/gi, "\n");
  returnText = returnText.replace(
    /<a.*href="(.*?)".*>(.*?)<\/a>/gi,
    " [$2]($1)",
  );

  //-- remove all inside SCRIPT and STYLE tags
  returnText = returnText.replace(
    /<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi,
    "",
  );
  returnText = returnText.replace(
    /<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi,
    "",
  );
  //-- remove all else
  returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

  //-- get rid of more than 2 multiple line breaks:
  returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g, "");

  //-- get rid of html-encoded characters:
  returnText = returnText.replace(/&nbsp;/gi, " ");
  returnText = returnText.replace(/&amp;/gi, "&");
  returnText = returnText.replace(/&quot;/gi, '"');
  returnText = returnText.replace(/&lt;/gi, "<");
  returnText = returnText.replace(/&gt;/gi, ">");
  returnText = decode(returnText);

  return returnText;
};
