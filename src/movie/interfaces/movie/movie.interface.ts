export interface Movie {
  _id: string;
  title: string;
  director: string;
  plot: string;
  poster: string;
  genres: string[];
  imdb: Imdb;
}
interface Imdb {
  rating: number;
  votes: number;
}

export interface ResponsePagination{
  data: Movie[];
  info: Info
}
export interface ResponsePaginationByName{
  data: Movie[];
  searchedWord: string;
  info: Info
}

export interface Info {
  totalMovies: number;
  totalPages: number;
  limit: number;
  page: number;
}