import getConfig from 'next/config';
import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const model = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Gestion',
            items: [
                { label: 'Info Formulaire de devis', icon: 'pi pi-fw pi-user', to: '/uikit/table' },
                {
                    label: 'Services ',
                    icon: 'pi pi-fw pi-share-alt',
                    items: [
                        {
                            label: 'Ajouter Service',
                            icon: 'pi pi-fw pi-plus',
                            to: '/services/ajout_service'
                        },
                        {
                            label: 'Tout les Services',
                            icon: 'pi pi-fw pi-search',
                            to: '/services'
                        }
                    ]
                },

                {
                    label: 'Projet ',
                    icon: 'pi pi-fw pi-sun',
                    items: [
                        {
                            label: 'Ajouter Projet',
                            icon: 'pi pi-fw pi-plus',
                            to: '/projet/ajout_projet'
                        },
                        {
                            label: 'Tout les Projet',
                            icon: 'pi pi-fw pi-search',
                            to: '/projet'
                        }
                    ]
                },

                {
                    label: 'Article',
                    icon: 'pi pi-fw  pi-id-card',
                    items: [
                        {
                            label: 'Ajouter Article',
                            icon: 'pi pi-fw pi-plus',
                            to: '/articles/ajout_article'
                        },
                        {
                            label: 'Tout les Articles',
                            icon: 'pi pi-fw pi-search',
                            to: '/articles'
                        }
                    ]
                },

                { label: 'Info Contact', icon: 'pi pi-fw pi-info-circle', to: '/pages/empty' }
            ]
        },
        {
            label: 'Partie Front',
            items: [{ label: 'Page Principale', icon: 'pi pi-fw pi-globe', to: '/landing' }]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
