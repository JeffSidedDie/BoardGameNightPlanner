import { compile, PathFunction } from 'path-to-regexp';

export enum Routes {
    Root = '/',
    Events_Edit = '/events',
    Games_List = '/games',
    Games_Edit = '/game/:id?',
}

const compiledRoutes: { [route: string]: PathFunction } = {};

export function generateRoute(route: Routes, params?: { [property: string]: string | number | undefined }) {
    if (!params) {
        return route;
    }
    if (!compiledRoutes[route]) {
        compiledRoutes[route] = compile(route);
    }
    const generator = compiledRoutes[route];
    return generator(params);
}