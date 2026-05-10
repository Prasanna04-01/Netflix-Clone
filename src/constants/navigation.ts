export const ROUTES = {
  HOME: '/',
  MOVIES: '/movies',
  TV_SHOWS: '/tv-shows',
  NEW_POPULAR: '/new-popular',
  MY_LIST: '/my-list',
  SEARCH: '/search',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'TV Shows', href: ROUTES.TV_SHOWS },
  { label: 'Movies', href: ROUTES.MOVIES },
  { label: 'New & Popular', href: ROUTES.NEW_POPULAR },
  { label: 'My List', href: ROUTES.MY_LIST },
];
