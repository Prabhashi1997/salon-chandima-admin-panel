import { Component, OnInit, ViewChild, TemplateRef, NgZone, ElementRef, Input, Inject, OnDestroy } from '@angular/core';
import {Router } from '@angular/router';
import {TokenService} from "../../../service/token.service";
import {CustomerApiService} from "../../../service/customer-api.service";
import {EmployApiService} from "../../../service/employ-api.service";


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit ,OnDestroy {
  email:string;
  Donor:any[];
  salonList:any = [];
  selectedDonor;
  getDonorByEmailSub;
  reqestDate;
  reqestState;


  constructor(
    private route: Router,
    private apiService: CustomerApiService,
    private salonService: EmployApiService,
    private tokenService: TokenService
    )

    {}
  ngOnInit(): void {
    this.getDonor();
    // this.socket.on('accepted-salon',()=>{
    //   this.getDonors();
    // });
    // this.socket.on('decline-salon',()=>{
    //   this.getDonors();

    // });


    // console.log(selectedSalon)

  }

  getDonor(){

    // this.email=this.tokenService.getEmail();
    // console.log(this.email);
    //
    // this.getDonorByEmailSub = this.apiService.getDonorByEmail(this.email).subscribe((data)=>{
    //   this.selectedDonor=data['data'];
    //   this.salonList = this.selectedDonor.nearSalon;
    //   this.reqestDate = data['data'].request[data['data'].request.length -1].validDate;
    //   this.reqestState = data['data'].request[data['data'].request.length - 1].finished;
    //   console.log(new Date(this.reqestDate) < new Date());
    //
    // // this.getSalonsSub = this.apiService.getDonorById().subscribe((data) => {
    // // this.Donor = data["data"];
    // // this.options = data["data"];
    //  console.log(this.selectedDonor);
    // })

 }

 valid(){
   return new Date(this.reqestDate) < new Date();
 }






  // book(){

  // }
  // book= function () {
  //    this.router.navigateByUrl('/book_appointment/appointment_details')
  // }


  public book(data)
  {
    this.route.navigate(['/customer/appointment-details'],
    { queryParams: { salon: data, reqestDate: this.reqestDate}, skipLocationChange: true  });
  }



  ngOnDestroy() {
    // if (this.declineSalonSub !== undefined) {
    //   this.declineSalonSub.unsubscribe();
    // }
    // if (this.acceptedSalonSub !== undefined) {
    //   this.acceptedSalonSub.unsubscribe();
    // }
    if (this.getDonorByEmailSub !== undefined) {
      this.getDonorByEmailSub.unsubscribe();
    }


  }
}


