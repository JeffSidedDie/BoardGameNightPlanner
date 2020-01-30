import React from 'react';
import { Link } from 'react-router-dom';
import { generateRoute, Routes } from 'common/routes';

export interface GeneratedLinkProperties {
    readonly route: Routes;
    readonly parameters?: { [property: string]: string | number | undefined };
    readonly className?: string;
}

export const GeneratedLink: React.FC<GeneratedLinkProperties> = (props) => {
    const route = generateRoute(props.route, props.parameters);
    return <Link className={props.className} to={route}>{props.children}</Link>;
}
GeneratedLink.whyDidYouRender = true;