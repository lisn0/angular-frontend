import { Component } from '@angular/core';
import { TracerService } from './tracer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-frontend';
  constructor(private trace: TracerService) {

  }
}
