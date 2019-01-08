import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'main-page',
        title    : 'Main Page',
        translate: 'NAV.MAIN_PAGE',
        type     : 'item',
        icon     : 'home',
        url      : '/home'
    },
    {
        id       : 'proba',
        title    : 'Proba',
        type     : 'item',
        icon     : 'home',
        url      : '/proba'
    },

    {
        id       : 'tasks',
        title    : 'Tasks',
        translate: 'NAV.TASKS',
        type     : 'item',
        icon     : 'play_for_work',
        url      : '/tasks',
        badge   : {
            title: '10',
            bg: '#F44336',
            fg: '#FFFFFF'
        },
    },
    {
        id       : 'news',
        title    : 'News',
        translate: 'NAV.NEWS',
        type     : 'item',
        icon     : 'library_books',
        url      : '/news'
    },
    {
        id        : 'products',
        title     : 'Products',
        type      : 'item',
        url       : '/apps/e-commerce/products'
    },


    {
        id       : 'administration',
        title    : 'Administration',
        translate: 'NAV.ADMINISTRATION',
        type     : 'collapsable',
        icon     : 'edit',
        children : [
            {
                id       : 'admin-users',
                title    : 'Users',
                type     : 'item',
                url      : '/admin/admin-users',
            },
            {
                id       : 'ctor-documents',
                title    : 'Constructor of documents',
                translate: 'NAV.CTOR_DOCUMENTS',
                type     : 'item',
                url      : '/admin/ctor-documents',
            },
            {
                id       : 'edit-menu',
                title    : 'Edit menu',
                translate: 'NAV.EDIT_MENU',
                type     : 'item',
                url      : '/admin/edit-menu',
            },
            {
                id       : 'edit-lists',
                title    : 'Edit lists',
                translate: 'NAV.EDIT_LISTS',
                type     : 'item',
                url      : '/admin/edit-lists',
            },
            {
                id       : 'edit-news',
                title    : 'Edit news',
                translate: 'NAV.EDIT_NEWS',
                type     : 'item',
                url      : '/admin/edit-news',
            },
            {
                id       : 'edit-users-groups',
                title    : 'Edit users-groups',
                translate: 'NAV.EDIT_USERS_GROUPS',
                type     : 'item',
                url      : '/admin/edit-users-groups'
            }

        ]
    },
    {
        id       : 'unified-database',
        title    : 'Unified database',
        translate: 'NAV.UNIFIED_DATABASE',
        type     : 'collapsable',
        icon     : 'dialpad',
        children : [
            {
                id       : 'ud-my-department',
                title    : 'My department',
                translate: 'NAV.UD_MY_DEPARTMENT',
                type     : 'item',
                url      : '/ud-my-department',
            },
            {
                id       : 'ud-shared-documents',
                title    : 'Shared documents',
                translate: 'NAV.UD_SHARED_DOCUMENTS',
                type     : 'item',
                url      : '/ud-shared-documents',
            },

        ]
    },
    {
        id       : 'my-department',
        title    : 'My department',
        translate: 'NAV.MY_DEPARTMENT',
        type     : 'collapsable',
        icon     : 'ballot',
        children: [
            {
                id       : 'mdep-tasks',
                title    : 'Tasks',
                translate: 'NAV.MDEP_TASKS',
                type     : 'item',
                url      : '/mdep-tasks',
           
            },
            {
                id       : 'mdep-inbound-documents',
                title    : 'Inbound Documents',
                translate: 'NAV.MDEP_INBOUND_DOCUMENTS',
                type     : 'item',
                url      : '/mdep-inbound-documents',
           
            },
            {
                id       : 'mdep-outbound-documents',
                title    : 'Outbound Documents',
                translate: 'NAV.MDEP_OUTBOUND_DOCUMENTS',
                type     : 'item',
                url      : '/mdep-outbound-documents',
           
            }
        ]
    },
    {
        id       : 'my-documents',
        title    : 'My documents',
        translate: 'NAV.MY_DOUCUMENTS',
        type     : 'group',
        children: [
            {
                id       : 'md-inbound-documents',
                title    : 'Inbound Documents',
                translate: 'NAV.MD_INBOUND_DOCUMENTS',
                type     : 'item',
                url      : '/md-inbound-documents',
           
            },
            {
                id       : 'md-outbound-documents',
                title    : 'Outbound Documents',
                translate: 'NAV.MD_OUTBOUND_DOCUMENTS',
                type     : 'item',
                url      : '/md-outbound-documents',
           
            },
            {
                id       : 'md-drafts',
                title    : 'Drafts',
                translate: 'NAV.MD_DRAFTS',
                type     : 'item',
                url      : '/md-drafts'
           
            }
        ]
    },
    
    {
        id       : 'sample',
        title    : 'Sample',
        translate: 'NAV.SAMPLE.TITLE',
        type     : 'item',
        icon     : 'email',
        url      : '/sample',
    }
];
