import 'isomorphic-fetch';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import { UIConfig } from 'aurelia-ui-framework';

declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) {
    aurelia.use.standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-validation'), (config: UIConfig) => { })
        .plugin(PLATFORM.moduleName('aurelia-ui-virtualization'))
        .plugin(PLATFORM.moduleName('aurelia-ui-framework'));

    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    new HttpClient().configure(config => {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        config.withBaseUrl(baseUrl);
    });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app/components/app/app')));
}

