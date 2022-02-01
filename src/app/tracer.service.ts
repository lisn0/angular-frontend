import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as lightstepTracer from 'lightstep-tracer';
import * as opentracing from 'opentracing';

@Injectable({
  providedIn: 'root'
})
export class TracerService {

  constructor() {
    // Put your Access/Project Token in your env config for prod
    this.initGlobalTracer('6FGz23ztGD781XM4vRGPQZak0Qr8EQYHATFEze3VyPrNuCUQXg9GegS4t7p34TjeyWcL+B8t9pGGXVTKenvI3tCu4j9+v/+k9zBQSvFr', 'frontend');
  }

  // Due to the xhr_instrumentation flag being true, all http calls will be traced
  initGlobalTracer(accessToken: string, componentName: string) {
    const options: lightstepTracer.TracerOptions = {
      access_token: accessToken,
      component_name: componentName,
      xhr_instrumentation: false
    };

    opentracing.initGlobalTracer( new lightstepTracer.Tracer(options));
  }
}
