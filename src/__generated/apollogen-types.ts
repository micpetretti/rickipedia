/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharacterDetailQuery
// ====================================================

export interface CharacterDetailQuery_character_origin {
  __typename: "Location";
  /**
   * The name of the location.
   */
  name: string | null;
  /**
   * The type of the location.
   */
  type: string | null;
  /**
   * The dimension in which the location is located.
   */
  dimension: string | null;
  /**
   * Time at which the location was created in the database.
   */
  created: string | null;
}

export interface CharacterDetailQuery_character_location {
  __typename: "Location";
  /**
   * The name of the location.
   */
  name: string | null;
  /**
   * The type of the location.
   */
  type: string | null;
  /**
   * The dimension in which the location is located.
   */
  dimension: string | null;
  /**
   * Time at which the location was created in the database.
   */
  created: string | null;
}

export interface CharacterDetailQuery_character_episode {
  __typename: "Episode";
  /**
   * The name of the episode.
   */
  name: string | null;
  /**
   * The code of the episode.
   */
  episode: string | null;
}

export interface CharacterDetailQuery_character {
  __typename: "Character";
  /**
   * The name of the character.
   */
  name: string | null;
  /**
   * The status of the character ('Alive', 'Dead' or 'unknown').
   */
  status: string | null;
  /**
   * The species of the character.
   */
  species: string | null;
  /**
   * The type or subspecies of the character.
   */
  type: string | null;
  /**
   * The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
   */
  gender: string | null;
  /**
   * The character's origin location
   */
  origin: CharacterDetailQuery_character_origin | null;
  /**
   * The character's last known location
   */
  location: CharacterDetailQuery_character_location | null;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image: string | null;
  /**
   * Episodes in which this character appeared.
   */
  episode: (CharacterDetailQuery_character_episode | null)[] | null;
  /**
   * Time at which the character was created in the database.
   */
  created: string | null;
}

export interface CharacterDetailQuery {
  /**
   * Get a specific character by ID
   */
  character: CharacterDetailQuery_character | null;
}

export interface CharacterDetailQueryVariables {
  id?: string | null;
}

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

export interface CharactersQueryVariables {
  page?: number | null;
  filter?: FilterCharacter | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface FilterCharacter {
  name?: string | null;
  status?: string | null;
  species?: string | null;
  type?: string | null;
  gender?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
