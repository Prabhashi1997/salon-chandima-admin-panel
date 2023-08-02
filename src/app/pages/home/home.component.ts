import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
// import {ToastrService} from 'ngx-toastr';
import * as $ from 'jquery';
import {BackendResponse} from "../../model/backendResponse";
import {GetInTouch} from "../../model/getInTouch";
import {environment} from "../../../environments/environment";
import {TokenService} from "../../service/token.service";
import { Router } from '@angular/router';
import { CustomerApiService } from 'app/service/customer-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  SlideOptions = {items: 1, dots: true, nav: true};
  CarouselOptions = {items: 3, dots: true, nav: true};

  reviews: { name: string; comment: number; rate: number; }[] = [];
  
  getInTouch: FormGroup;

  BASE_URL = environment.BASE_URL;

  constructor(
              private token: TokenService,
              private _fb: FormBuilder,
              private _http: HttpClient,
              private router: Router,
              private reviewService: CustomerApiService
              // private _toastr: ToastrService
  ) {
    const node = document.createElement('script');
    node.src = '../../assets/js/main.js';
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);

    this.buildForm();
  }


  buildForm() {
    this.getInTouch = this._fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllReview();
    // const owl = $('.owl-carousel');
    // // @ts-ignore
    // owl.owlCarousel({
    //   items:4,
    //   loop:true,
    //   margin:10,
    //   autoplay:true,
    //   autoplayTimeout:1000,
    //   autoplayHoverPause:true
    // });
    // $('.play').on('click',() => {
    //   owl.trigger('play.owl.autoplay',[1000])
    // })
    // $('.stop').on('click',() => {
    //   owl.trigger('stop.owl.autoplay')
    // })
    setTimeout(() => {
      // const node = document.createElement('script');
      // node.src = '../../assets/js/main.js';
      // node.type = 'text/javascript';
      // node.async = false;
      // document.getElementsByTagName('head')[0].appendChild(node);
    }, 200)
    setTimeout(() => {
      const loader = document.getElementsByClassName('loader-class')[0] as HTMLElement;
      const head = document.getElementsByClassName('head')[0] as HTMLElement;
      loader.style.display = 'none';
      head.style.display = 'block';
      const top = document.getElementsByClassName('back_top')[0] as HTMLElement;
      top.click();
    }, 100);
  }

  async submit() {
    try {
      const data = this.getInTouch.value as GetInTouch;
      console.log(data)

      

      this.getInTouch.reset()
        this.getInTouch.clearValidators()
        this.getInTouch.clearAsyncValidators()
        setTimeout(() => this.formGroupDirective.resetForm(), 0);

    } catch (error) {
      // this._toastr.error('fail to send message');
    }


  }

  ismobile() {
    if (window.innerWidth < 764) {
      return true;
    } else {
      return false;
    }
  }

  login(){
    return this.token.loggedIn();
  }

  register(){
    return this.token.registeredIn();
  }

  toDashboard() {
    if(this.token.isUserAdmin()) {
      this.router.navigateByUrl('/admin/dashboard')
    } else if(this.token.isUserCustomer()) {
      this.router.navigateByUrl('/customer/dashboard')
    } else {
      this.router.navigateByUrl('/employee/dashboard')
    }
  }


  getAllReview() {
    this.reviewService.getAllReviews().subscribe((e) => {
      this.reviews = e.reviews;
    });
  }

  


}
