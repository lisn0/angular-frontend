import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service'
import {User} from '../user';
import {InteriorUser} from '../interior-user';
import {FormBuilder} from "@angular/forms";
import { TracerService } from '../tracer.service';
import * as opentracing from 'opentracing';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  result: any;
  user!: User;
  interiorUser!: InteriorUser;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private trace: TracerService,
    private http: HttpClient,
  ) { }

  checkoutForm = this.formBuilder.group({
    cin: '',
  });

  onSubmit(): void {
    // @ts-ignore
    const {value} = this.checkoutForm.get('cin');
    console.log(value);

    const span = opentracing.globalTracer().startSpan('api/v1/interior');
    // Process checkout data here
    this.userService.getUsers(value).subscribe((data: User) => {
      console.log(data);
      this.user = data;
      span.setTag('kind', 'interior');
      span.setTag("cin searched", this.user.cin);
      span.log({response : this.result});
    },

      error => {
        this.result = error;
        span.setTag('error', true);
        span.log({data: this.result});
      },
      () => {
        span.finish();
      });

    const span2 = opentracing.globalTracer().startSpan('api/v1/finance');

    // @ts-ignore
    this.userService.getInteriorUsers(value).subscribe((data: InteriorUser) => {
      console.log(data);
      this.interiorUser = data;
      span2.setTag('kind', 'finance');
      span2.setTag("cin searched", this.user.cin);
      span2.log({response : this.result});
      },

      error => {
        this.result = error;
        span2.setTag('error', true);
        span2.log({data: this.result});
      },
      () => {
        span2.finish();
      });

    console.warn('Your order has been submitted', this.checkoutForm.value);
    // this.checkoutForm.reset();
  }
  ngOnInit(): void {
  }
}
