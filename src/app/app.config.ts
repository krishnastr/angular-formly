import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldStepper } from './stepper.type';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), 
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(FormlyModule.forRoot({
    validationMessages: [{ name: 'required', message: 'This field is required' }],
    types: [{ name: 'stepper', component: FormlyFieldStepper, wrappers: [] }],
    presets: [
      {
        name: 'probeName',
        config: { 
            id: 'probeName',
            key: 'probeName',
            type: 'input',
            className: 'spacing',
            props: {
              label: 'Probe Name',
              required: true,
            },
          },
      },
      {
        name: 'ICMPInterface',
        config: {
          key: 'ICMPInterface',
          type: 'select',
          className: 'spacing',
          props: {
            label: 'ICMP Interface',
            filter: true,
            placeholder: 'Placeholder',
            description: 'Description',
            required: true,
            valueProp: 'label',
            options: [ 
              {value: "all", label: 'All'},
              {value: "cell", label: 'cell'},
              {value: "eth1", label: 'eth1'},
              {value: "eth2", label: 'eth2'},
              {value: "wlan", label: 'wlan'},
              {value: "ap", label: 'ap'}
            ],
          }
        },
      }
    ],
  }))]
};
