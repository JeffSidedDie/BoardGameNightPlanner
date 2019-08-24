import React from 'react';
import { Link } from 'react-router-dom';
import { generateRoute, Routes } from 'common/routes';

export interface GeneratedLinkProperties {
    readonly route: Routes;
    readonly parameters?: { [property: string]: string | number | undefined };
    readonly className?: string;
}

export const GeneratedLink: React.FC<GeneratedLinkProperties> = (props) => {
    return <Link className={props.className} to={generateRoute(props.route, props.parameters)}>{props.children}</Link>;
}