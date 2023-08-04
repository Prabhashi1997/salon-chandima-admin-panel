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
import Swal from 'sweetalert2';
import { CommonService } from 'app/service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = true;

  contact = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }


  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  SlideOptions = {items: 1, dots: true, nav: true};
  CarouselOptions = {items: 3, dots: true, nav: true};

  reviews: { name: string; comment: number; rate: number; }[] = [];

  getInTouch;

  BASE_URL = environment.BASE_URL;

  constructor(
              private token: TokenService,
              private _fb: FormBuilder,
              private _http: HttpClient,
              private router: Router,
              private reviewService: CustomerApiService,
              private customerService: CommonService
  ) {
    const node = document.createElement('script');
    node.src = '../../assets/js/main.js';
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);
  }


  // buildForm() {
  //   this.getInTouch = this._fb.group({
  //     name: new FormControl('', Validators.required),
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     subject: new FormControl('', Validators.required),
  //     message: new FormControl('', Validators.required),
  //   })
  // }

  ngOnInit(): void {
    this.getAllReview();

    this.getInTouch = new FormGroup({
      name: new FormControl(this.contact.name, [Validators.required]),
      email: new FormControl(this.contact.email, [Validators.required, Validators.email]),
      subject: new FormControl(this.contact.subject, [Validators.required]),
      message: new FormControl(this.contact.message, [Validators.required]),
    });
    this.isLoading = false;

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

  get name() {
    return this.getInTouch?.get('name')
  }

  get email() {
    return this.getInTouch?.get('email')
  }

  get subject() {
    return this.getInTouch?.get('subject')
  }

  get message() {
    return this.getInTouch?.get('message')
  }

  submit(){
    this.getInTouch.markAllAsTouched();
    if(!this.getInTouch.invalid) {
        Swal.fire({
          title: 'Are you sure?',
          text: `Do You want to send this message?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4250ce',
          cancelButtonColor: '#dc3545',
          confirmButtonText: `Yes, send it`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Processing!',
              didOpen: () => {
                Swal.showLoading();
              },
              allowOutsideClick: () => !Swal.isLoading()
            }).then(() => {
            });
            console.log(this.contact);
            this.customerService.addMessage(this.contact).subscribe(
                async data => {
                  await Swal.fire({
                    title: 'Success!',
                    text: `You have successfully sent.`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  this.router.navigateByUrl('/');

                }, async error => {
                  console.log(error)
                  await Swal.fire(
                      'Error!',
                      'Your process has been cancelled.',
                      'error'
                  );

                }
            )
          }
        });
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
      this.router.navigateByUrl('/admin')
    } else if(this.token.isUserCustomer()) {
      this.router.navigateByUrl('/customer')
    } else {
      this.router.navigateByUrl('/employee')
    }
  }


  getAllReview() {
    this.reviewService.getAllReviews().subscribe((e) => {
      this.reviews = e.reviews;
    });
  }

}
