// Copyright 2020 Samuele de Tomasi. All rights reserved. MIT license.

import * as wiki from "./mod.ts";

interface Person {
  name: string;
  surname: string;
  searched?: boolean;
  found?: boolean;
  pageid?: number;
  title?: string;
  hasSuggestion?: boolean;
  suggestion?: string;
}

const peopleCorrect: Array<Person> = [{
  name: "Italo",
  surname: "Calvino",
}, {
  name: "Luigi",
  surname: "Pirandello",
}, {
  name: "Italo",
  surname: "Svevo",
}, {
  name: "Umberto",
  surname: "Saba",
}, {
  name: "Giuseppe",
  surname: "Ungaretti",
}, {
  name: "Eugenio",
  surname: "Montale",
}, {
  name: "Ignazio",
  surname: "Silone",
}];

const peopleWrong: Array<Person> = [{
  name: "Itallo",
  surname: "Calvvino",
}, {
  name: "Luiggi",
  surname: "Pirrandello",
}, {
  name: "Itallo",
  surname: "Svevvo",
}, {
  name: "Umbertto",
  surname: "Sabba",
}, {
  name: "Giusepe",
  surname: "Ungareti",
}, {
  name: "Euggenio",
  surname: "Montalle",
}, {
  name: "Ignasio",
  surname: "Silome",
}];

const peopleFantasy: Array<Person> = [{
  name: "Giuseppe",
  surname: "Camino",
}, {
  name: "Carmelo",
  surname: "Arturo",
}, {
  name: "Coriandolo",
  surname: "Paperino",
}, {
  name: "Friend",
  surname: "Fantasy",
}, {
  name: "Giovannino",
  surname: "Rossi",
}, {
  name: "Pico",
  surname: "Piccolino",
}, {
  name: "Dino",
  surname: "Stupi",
}];

const searchPerson = async (
  name: string,
  language: string,
): Promise<wiki.WikiSearch_Query> => {
  const search: wiki.WikiSearch_Query = await wiki.wikiSearch(
    { language, srsearch: name },
  );
  return search;
};

const updatePerson = (
  person: Person,
  search: wiki.WikiSearch_Query,
): Person => {
  const result: Person = {
    name: person.name,
    surname: person.surname,
    searched: true,
    found: wiki.hasResult(search),
    pageid: wiki.getPageId(search),
    title: wiki.getSearchTitle(search),
    hasSuggestion: wiki.hasSuggestion(search),
    suggestion: wiki.getSuggestion(search),
  };
  return result;
};

const findPerson = async (person: Person, language: string) => {
  const search: wiki.WikiSearch_Query = await searchPerson(
    `${person.name} ${person.surname}`,
    language,
  );
  const result: Person = updatePerson(person, search);

  return result;
};

const peopleSearch = async (people: Array<Person>) => {
  return Promise.all(people.map((person: Person) => findPerson(person, "it")));
};

const isExactMatch = (person: Person): boolean => {
  try {
    const title: string = (person.title !== null && person.title !== undefined)
      ? person.title.toLowerCase()
      : "";
    const name: string = person.name.toLowerCase() + " " +
      person.surname.toLowerCase();
    return title === name;
  } catch (error) {
    return false;
  }
};

const logResult = (people: Array<Person>): string => {
  return `COMPLETED
        searched: ${people.filter((person) => person.searched).length}
        found: ${people.filter((person) => person.found).length}
        suggestion: ${people.filter((person) => person.hasSuggestion).length}
        exact match: ${people.filter((person) => isExactMatch(person)).length}`;
};
console.log("SEARCHING peoplesCorrect");
const peopleCorrectSearch = await peopleSearch(peopleCorrect);
console.log(logResult(peopleCorrectSearch));

console.log("SEARCHING peopleWrong");
const peopleWrongSearch = await peopleSearch(peopleWrong);
console.log(logResult(peopleWrongSearch));

console.log("SEARCHING peopleFantasySearch");
const peopleFantasySearch = await peopleSearch(peopleFantasy);
console.log(logResult(peopleFantasySearch));
