// Data Structure from:
// 'https://mcuapi.herokuapp.com/api/v1/movies?limit=50';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  box_office: number;
  duration: number;
  overview: string;
  cover_url: string;
  trailer_url: string;
  directed_by: string;
  phase: number;
  saga: string;
  chronology: number;
  post_credit_scenes: number;
  imdb_id: string;
}

export interface SortedByType {
  sortCol: keyof Movie | null;
  desc: boolean;
}

export interface SearchStateType extends SortedByType {
  filter: string;
}
