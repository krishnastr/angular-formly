import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPresetModule } from '@ngx-formly/core/preset';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyDatepickerModule } from '@ngx-formly/primeng/datepicker';


// import { default  as devices } from './devices.json';

import { AppService } from './app.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormlyModule, FormlyPrimeNGModule, FormlyDatepickerModule, FormlyPresetModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  devices: any = {};

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getDevices().subscribe(data => {
      this.devices = data;
    });
  }
  title = 'angular17-formly';

  selectedDevice: any = {} as any;
  form = new FormGroup({});
  model: any = {probeDevice: 'ICMP Echo'};
  options: FormlyFormOptions = {};

  allFields: FormlyFieldConfig[] = [
                {
                  id: 'probe_form',
                  fieldGroup : [
                    {
                      id: 'probe_fields',
                      fieldGroup: [
                        {
                          id: 'probeName',
                          key: 'probeName',
                          type: 'input',
                          className: 'spacing',
                          props: {
                            label: 'Probe Name',
                            required: true,
                          },
                        },
                        {
                          id: 'probe_device',
                          key: 'probeDevice',
                          type: 'select',
                          className: 'spacing',
                          props: {
                            label: 'Probe Device',
                            filter: true,
                            placeholder: 'Placeholder',
                            description: 'Description',
                            required: true,
                            valueProp: 'label',
                            options: [
                              { value: 'ICMP_Echo', label: 'ICMP Echo' },
                              { value: 'HTTP_Get', label: 'HTTP Get' },
                              { value: 'DNS_Lookup', label: 'DNS Lookup' },
                              { value: 'UDP_Jitter', label: 'UDP Jitter' },
                            ],
                          },
                          hooks: {
                            onInit: (field: any) => {
                              const dropdown = field.parent.get('probeDevice').formControl;
                              dropdown.valueChanges.subscribe( (data: any) => {
                                console.log(this.model, this.devices, data);
                                this.selectedDevice = this.devices.scripts
                                                      .find((item: any) => item.script['name'] === this.model.probeDevice);
                                console.log(this.selectedDevice);
                              })
                            }
                          }
                        },
                        {
                          id: 'probeRepeat',
                          key: 'probeRepeat',
                          type: 'input',
                          className: 'spacing',
                          props: {
                            label: 'Probe Repeat',
                            required: true,
                          },
                        },
                      ]
                    },
                    {
                      id: 'probe_packets',
                      fieldGroup: [
                          {
                            id: 'packets',
                            key: 'packets',
                            type: 'input',
                            className: 'spacing',
                            props: {
                              label: 'Packets',
                              required: true,
                            },
                        },
                          {
                            id: 'interval',
                            key: 'interval',
                            type: 'input',
                            className: 'spacing',
                            props: {
                              label: 'Interval',
                              required: true,
                            },
                        },
                          {
                            id: 'timeout',
                            key: 'timeout',
                            type: 'input',
                            className: 'spacing',
                            props: {
                              label: 'Packets',
                              required: true,
                            },
                        }
                      ]
                    },
                      {
                        id: 'data_size',
                        fieldGroup: [
                            {
                              id: 'dataSize',
                              key: 'dataSize',
                              type: 'input',
                              className: 'spacing',
                              props: {
                                label: 'Data Size',
                                required: true,
                              },
                              expressions: {
                                hide: () =>  this.selectedDevice.script ? this.selectedDevice.script!.name !== 'ICMP Echo': false
                              }
                          }
                        ]
                      },
                      {
                        id: 'verify_data',
                        fieldGroup: [
                            {
                              id: 'verifyData',
                              key: 'verifyData',
                              type: 'radio',
                              className: 'spacing',
                              props: {
                                label: 'Verify Data',
                                required: true,
                                labelProp: 'label',
                                valueProp: 'key',
                                options: [
                                  {label: 'Verified', key: 'true'},
                                  {label: 'Unverified', key: 'false'}
                                ]
                              },
                              expressions: {
                                hide: () =>  this.selectedDevice.script ? this.selectedDevice.script!.name !== 'HTTP Get': false
                              }
                          }
                        ]
                      },
                      {
                        id: 'destination',
                        fieldGroup: [
                          {
                            id: 'host',
                            key: 'host',
                            type: 'input',
                            className: 'spacing',
                            props: {
                              label: 'Host',
                              required: true,
                            },
                          },
                          {
                            id: 'port',
                            key: 'port',
                            type: 'input',
                            className: 'spacing',
                            props: {
                              label: 'Port',
                              required: true,
                            },
                          },
                        ]
                      },
                      {
                        id: 'name_server',
                        fieldGroup: [
                          {
                            id: 'name_server',
                            key: 'name_server',
                            type: 'input',
                            className: 'spacing',
                            props: {
                              label: 'Name Server',
                              required: true,
                            },
                            expressions: {
                              hide: () =>  this.selectedDevice.script ? this.selectedDevice.script!.name !== 'DNS Lookup': false
                            }
                          },
                        ]
                      }
                  ]
                }
            ];


  fieldsUsingMap: FormlyFieldConfig[] = [
    {
      id: 'probe_form',
      fieldGroup : [
        {
          id: 'probe_fields',
          fieldGroup: [
            {
              type: '#probeName'
            },
            {
              id: 'probe_device',
              key: 'probeDevice',
              type: 'select',
              className: 'spacing',
              props: {
                label: 'Probe Device',
                filter: true,
                placeholder: 'Placeholder',
                description: 'Description',
                required: true,
                valueProp: 'label',
                options: [
                  { value: 'ICMP_Echo', label: 'ICMP Echo' },
                  { value: 'HTTP_Get', label: 'HTTP Get' },
                  { value: 'DNS_Lookup', label: 'DNS Lookup' },
                  { value: 'UDP_Jitter', label: 'UDP Jitter' },
                ],
              },
              hooks: {
                onInit: (field: any) => {
                  const dropdown = field.parent.get('probeDevice').formControl;
                  dropdown.valueChanges.subscribe( (data: any) => {
                    console.log(this.model);
                    this.selectedDevice = this.devices.scripts
                                                      .find((item: any) =>  item.script['name'] === this.model.probeDevice);
                    
                      let relatedFields = [];
                      console.log(this.selectedDevice.script.arguments);
                      if(this.selectedDevice.script) {
                        relatedFields = this.selectedDevice.script.arguments.map((item: any) => {
                        const name: string = item['display_name'];
                        console.log(name, this.fieldsMap[name as keyof any])
                        return this.fieldsMap[name as keyof any];
                      })
                      console.log(relatedFields);
                    }
                    this.fieldsUsingMap.splice(1, this.fieldsUsingMap.length -1)
                    
                     this.fieldsUsingMap = [
                      ...this.fieldsUsingMap,
                      ...relatedFields
                    ]
                  })
                }
              }
            },
            {
              id: 'probeRepeat',
              key: 'probeRepeat',
              type: 'input',
              className: 'spacing',
              props: {
                label: 'Probe Repeat',
                required: true,
              },
            },
          
          ]
        }
      ]
    }
            ]

  fieldsMap: any = {
    'Packet': {
        id: 'packets',
        key: 'packets',
        type: 'input',
        className: 'spacing',
        props: {
          label: 'Packets',
          required: true,
        },
    },
    'Interval': {
        id: 'interval',
        key: 'interval',
        type: 'input',
        className: 'spacing',
        props: {
          label: 'Interval',
          required: true,
        },
    },
    'Timeout': {
        id: 'timeout',
        key: 'timeout',
        type: 'input',
        className: 'spacing',
        props: {
          label: 'Packets',
          required: true,
        },
    },
    'Datasize': {
      id: 'dataSize',
      key: 'dataSize',
      type: 'input',
      className: 'spacing',
      props: {
        label: 'Data Size',
        required: true,
      },
    },
    'Verify data': {
      id: 'verifyData',
      key: 'verifyData',
      type: 'radio',
      className: 'spacing',
      props: {
        label: 'Verify Data',
        required: true,
        labelProp: 'label',
        keyProp: 'key',
        options: [
          {label: 'Verified', key: 'true'},
          {label: 'Unverified', key: 'false'}
        ]
      },
    },
    'Destination': {
      fieldGroup: [
        {
          id: 'host',
          key: 'host',
          type: 'input',
          className: 'spacing',
          props: {
            label: 'Host',
            required: true,
          },
        },
        {
          id: 'port',
          key: 'port',
          type: 'input',
          className: 'spacing',
          props: {
            label: 'Port',
            required: true,
          },
        },
      ]
    },
    'ICMP interface': {
      type: '#ICMPInterface',
    },
    'Name Server': {
      id: 'nameServer',
      key: 'name_server',
      type: 'input',
      className: 'spacing',
      props: {
        label: 'Name Server',
        required: true,
      },
    }
  }




  submit() {
    alert(JSON.stringify(this.model));
  }
}
