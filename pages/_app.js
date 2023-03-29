import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import AuthChecker from '../demo/components/AuthChecker';

export default function MyApp({ Component, pageProps, router }) {
    if (Component.getLayout) {
        return (
            <AuthChecker>
                <LayoutProvider>
                    {Component.getLayout(<Component {...pageProps} />)}
                </LayoutProvider>
            </AuthChecker>
        )
    } else {
        return (
            <AuthChecker>
                <LayoutProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </LayoutProvider>
            </AuthChecker>
        );
    }
}
