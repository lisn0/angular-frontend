import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service'
import {User} from '../user';
import {InteriorUser} from '../interior-user';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!: User;
  interiorUser!: InteriorUser;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { }

  checkoutForm = this.formBuilder.group({
    cin: '',
  });

  onSubmit(): void {
    // @ts-ignore
    const {value} = this.checkoutForm.get('cin');
    console.log(value)
    // Process checkout data here
    this.userService.getUsers(value).subscribe((data: User) => {
      console.log(data);
      this.user = data;
    });
    // @ts-ignore
    this.userService.getInteriorUsers(value).subscribe((data: InteriorUser) => {
      console.log(data);
      this.interiorUser = data;
    });

    console.warn('Your order has been submitted', this.checkoutForm.value);
    // this.checkoutForm.reset();
  }
  ngOnInit(): void {
    // this.userService.getUsers().subscribe((data: User) => {
    //   console.log(data);
    //   this.user = data;
    // });
  }
}
