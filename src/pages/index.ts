import loadable from "@loadable/component";

export const Main = loadable(() => import('./Main'));
export const Draft = loadable(() => import('./Draft'));
export const Meal = loadable(() => import('./Meal'));
export const ExplorerFound = loadable(() => import('./ExplorerFound'));
export const NotFound = loadable(() => import('./NotFound'));
