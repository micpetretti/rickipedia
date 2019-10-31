/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharactersQuery
// ====================================================

export interface CharactersQuery_characters_info {
  __typename: "Info";
  /**
   * Number of the next page (if it exists)
   */
  next: number | null;
}

export interface CharactersQuery_characters_results {
  __typename: "Character";
  /**
   * The id of the character.
   */
  id: string | null;
  /**
   * The name of the character.
   */
  name: string | null;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image: string | null;
  /**
   * The status of the character ('Alive', 'Dead' or 'unknown').
   */
  status: string | null;
}

export interface CharactersQuery_characters {
  __typename: "Characters";
  info: CharactersQuery_characters_info | null;
  results: (CharactersQuery_characters_results | null)[] | null;
}

export interface CharactersQuery {
  /**
   * Get the list of all characters
   */
  characters: CharactersQuery_characters | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
