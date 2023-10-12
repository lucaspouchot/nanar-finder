/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_TMDB_API_KEY: string;
    REACT_APP_TMDB_API_URL: string;
    REACT_APP_TMDB_IMAGE_URL: string;
    REACT_APP_TMDB_LARGE_IMAGE_URL: string;
  }
}

type JSXChildren = string | JSX.Element | JSX.Element[] | (() => JSX.Element);

type JSXProps = {
  className?: string;
  children?: JSXChildren;
}

type AllBoolean<T> = {
  [K in keyof T]?: T[K] extends Array<infer U> ? AllBoolean<U>[] : boolean
}

type AllOptional<T> = {
  [K in keyof T]?: T[K] extends Array<infer U> ? AllOptional<U>[] : T[K]
}
