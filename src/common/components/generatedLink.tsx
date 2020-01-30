import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { generateRoute, Routes } from 'common/routes';

export interface GeneratedLinkProperties {
    readonly route: Routes;
    readonly parameters?: { [property: string]: string | number | undefined };
    readonly className?: string;
    readonly children?: ReactNode;
}

export class GeneratedLink extends React.Component<GeneratedLinkProperties> {
    static whyDidYouRender = true;

    private generatedRoute: string = '';

    constructor(props: Readonly<GeneratedLinkProperties>) {
        super(props);
        this.generatedRoute = generateRoute(props.route, props.parameters);
    }

    shouldComponentUpdate(nextProps: GeneratedLinkProperties) {
        const newRoute = generateRoute(nextProps.route, nextProps.parameters);
        if (this.generatedRoute !== newRoute) {
            this.generatedRoute = newRoute;
            return true;
        }
        return this.props.className !== nextProps.className
            || this.props.children !== nextProps.children;
    }

    public render() {
        return <Link className={this.props.className} to={this.generatedRoute}>{this.props.children}</Link>;
    }
}