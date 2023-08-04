import {Component, OnInit, Renderer2, ViewChild, OnDestroy, ElementRef} from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import * as moment from 'moment';
import axios from 'axios';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import {ViewCalendarService} from "../../../service/viewcalendar.service";
import {TokenService} from "../../../service/token.service";
import {PaymentService} from "../../../service/payment.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerApiService} from "../../../service/customer-api.service";
import {ServiceApiService} from "../../../service/service-api.service";
import {AppointmentApiService} from "../../../service/appointment-api.service";

//payment
declare let payhere: any;

//add, update and delete component
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})


export class AppointmentDetailsComponent implements OnInit, OnDestroy{

  showModal: boolean;
  deleteAppointmentSub;
  getAllSub;
  salon;
  createAppointmentSub;
  createAppointment1Sub;
  updateAppointmentSub;
  options: any;
  event: any;
  eventsModel: any;
  n: number;
  date: number;
  @ViewChild('calendar', {static: false}) calendar: FullCalendarComponent;

  @ViewChild('modal') modal: ElementRef | undefined;

  // the #calendar in the template
  calendarVisible = true;
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  todayDate = moment().startOf('day');
  arg;

  payment;
  customers: {  id: number, name: string }[] = [];
  services: {  id: number, name: string }[] = [];

  appointmentForm;

  appointment = {
    service: [],
    date: '',
    time: '',
    start: '',
    end: '',
    duration: 0,
    price: 0,
  }

  constructor(
    private renderer: Renderer2,
    private _ViewCalendarService: ViewCalendarService,
    private tokenService:TokenService,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private appointmentService: AppointmentApiService,
    private customerService: CustomerApiService,
    private serviceService: ServiceApiService,
  ) {
  }

  ngOnInit() {

    this.getall();
    this.options = {
      calendarWeekends: true,
      editable: true,
      disableResizing: true,
      eventDurationEditable: false,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth timeGridWeek'
      },
      eventOverlap:  (stillEvent, movingEvent) => {
        return stillEvent.allDay && movingEvent.allDay;
      },
      plugins: [dayGridPlugin, interactionPlugin, timeGrigPlugin],
      aspectRatio: 3,
      businessHours: {
        startTime: '8:00',
        endTime: '17:00',
        daysOfWeek: [0, 1, 2,3,4,5,6 ]
      },
      contentHeight: 480,
      eventLimit:true,
      events: this.calendarEvents,
      height:500,
      nowIndicator:true,
      visibleRange:{
        start: '2023-01-01',
        end: '2023-12-31'
      },
      initialView: 'timeGridWeek',
      slotDuration: "00:30",
      weekends: this.calendarWeekends,
      dateClick: this.handleDateClick.bind(this),
      dayRender: this.dayRender.bind(this),
      eventDragStop: this.updateAppointment.bind(this),
      eventDrop: this.updateAppointment.bind(this),
      eventReceive: this.createAppointment.bind(this),
      eventRender: this.eventDo.bind(this),
    }
    this.appointmentForm = new FormGroup({
      service: new FormControl(this.appointment.service, [Validators.required]),
    });

    this.loadData();

  }

  get service() {
    return this.appointmentForm?.get('service')
  }
  loadData() {
    this.customerService.getAllCustomers().subscribe((e) => {
      this.customers = e.customers;
    });

    this.serviceService.getAllServices().subscribe((e) => {
      this.services = e.services;
    });
  }


  handleDateClick(arg) {
    console.log(arg)
    let pdate = new Date();
    pdate.setHours(0)
    pdate.setDate(2 + pdate.getDate());
    if (new Date(arg.dateStr.split('+')[0]) > new Date(pdate.toISOString()) ) {
      // tslint:disable-next-line: max-line-length
      if (!this.isAnOverlapEvent(arg.dateStr.split('+')[0], arg.dateStr.split('+')[0].substring(0, 11)
        + this.increese(arg.dateStr.split('+')[0].substring(11, 13))
        + arg.dateStr.split('+')[0].substring(13, 19))) {

        this.appointment.start = arg.dateStr;


        Swal.fire({
          title: 'Book Appointment',
          showCancelButton: true,
          confirmButtonText: 'Save',
          html: this.modal?.nativeElement,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            if (new Date(this.appointment.end).getHours() < 18 &&
                !this.calendarEvents.find((e) => {
                  const startDate = new Date(this.appointment.start);
                  const c1 = new Date(e.start as string);
                  const c2 = new Date(e.end as string);
                  const endDate = new Date(this.appointment.end);
                  return  (startDate < c1 && endDate > c1) || (startDate < c2 && endDate > c2)
                })
            ) {
              this.appointmentService.addAppointment(this.appointment).subscribe((data) => {
                this.getall();
              })
              this.calendarEvents = [ ...this.calendarEvents, {
                title: this.tokenService.getFirstName(),
                start: this.appointment.start,
                end: this.appointment.end,
                color: '#ad1457'
              },];

            } else {
              const s = Math.ceil(this.appointment.duration / 60);
              await Swal.fire('Info', `If you want set this appointment select ${s} hour free slot`, 'info')
              this.getall();
            }
          }
        })

        /////
      }
    } else {
      pdate.setDate(1 + pdate.getDate());
      Swal.fire(
        'Error!',
        'You can get Appointment after ' + pdate.toISOString().substring(0,10)+' 00:00',
        'error'
      )
    }


  }

  isAnOverlapEvent(eventStartDay, eventEndDay) {
    // Events
      var events = this.calendarEvents;

    for (let i = 0; i < events.length; i++) {
      const eventA = events[i];

      // start-time in between any of the events
      if ((eventStartDay + '+05:30') > eventA.start && (eventEndDay + '+05:30')  < eventA.end) {
        console.log("start-time in between any of the events",eventStartDay, eventA  )
        return true;
      }
      // end-time in between any of the events
      if ((eventEndDay + '+05:30') > eventA.start && (eventEndDay + '+05:30')  < eventA.end) {
        console.log("end-time in between any of the events",eventEndDay, eventA)
        return true;
      }
      //any of the events in between/on the start-time and end-time
      if ((eventStartDay + '+05:30') <= eventA.start && (eventEndDay + '+05:30')  >= eventA.end) {
        console.log("any of the events in between/on the start-time and end-time", eventEndDay,eventStartDay, eventA)
        return true;
      }
    }
    return false;
  }

  onServiceChange(x) {
    this.appointment.duration = x.reduce( (sum, tax)  => {
      return sum + tax.duration;
    }, 0);
    this.appointment.price = x.reduce( (sum, tax)  => {
      return sum + tax.price;
    }, 0);
    const s = new Date(this.appointment.start);
    const l = s.setMinutes(s.getMinutes() + this.appointment.duration);
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(l - tzoffset)).toISOString().slice(0, -5);
    this.appointment.end = localISOTime + '+05:30'

  }

  getall(){
    this.appointmentService.getCalender().subscribe(
      data => {
        this.calendarEvents = data.appointments;
      }
    )
  }




  eventDragStop(model) {
    console.log(model.event.id);
    console.log(model.event);
  }



  show() {
    this.showModal = true; // Show-Hide Modal Check
  }

  increese(x){
    x = (+x)+1;
    let y
    if( x < 10){
      y = '0'+x;
    } else{
      y = x+ ''
    }
    return y;

  }

  createAppointment(event) {
    // console.dir(this.calendar.element.nativeElement.querySelector(".fc-event"))
    let date = event.event.start;
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    // const string = event.event.name;

     this.createAppointment1Sub = this._ViewCalendarService.createAppointment(date).subscribe(
      data => {
       if (data.success) {
          event.event.setProp('id', data.task.id);
       }
       }
     )

  }





  updateAppointment(event) {
    //console.log('ddd');
    let data;
    let date;
    if (event.delta !== undefined){
      data = event.delta;
      date = event
      let pdate = new Date(date.oldEvent.start)
      if (data.milliseconds !== 0){
        pdate.setMilliseconds(data.milliseconds + pdate.getMilliseconds());
      }
      if (data.days !== 0) {
        pdate.setDate(data.days + pdate.getDate())
      }
      if (data.months !== 0) {
        pdate.setMonth(data.months + pdate.getMonth());
      }
      if (data.years !== 0) {
        pdate.setFullYear(data.years+ pdate.getFullYear());
      }
      pdate.setMilliseconds(pdate.getMilliseconds() + 5.5*60*60*1000)
      let xdate = new Date();
      xdate.setHours(0)
      xdate.setDate(0 + xdate.getDate());
      if (new Date(pdate.toISOString().substring(0, 19) + '+05:30') > new Date(xdate.toISOString())) {
        if (!this.isAnOverlapEvent(pdate.toISOString().substring(0, 19), pdate.toISOString().substring(0, 19).substring(0, 11)
          + this.increese(pdate.toISOString().substring(0, 19).substring(11, 13))
          + pdate.toISOString().substring(0, 19).split('+')[0].substring(13, 19))) {
          Swal.fire({
            title: 'Are you sure?',
            text: `Salon will be updated permanently`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            preConfirm: (login) => {

              this.updateAppointmentSub = this._ViewCalendarService.updateAppointmentTime(
                { id: event.event.id, time: pdate.toISOString().substring(0, 19) + '+05:30' }
              ).subscribe(
                (data) => {
                  if (!data) {
                    this.getall()
                    Swal.showValidationMessage(
                      `Request failed`
                    )
                  }

                }
              )

            },
            // tslint:disable-next-line: only-arrow-functions
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
              this.getall()
              Swal.fire(
                'Cancelled',
                'Appointment was not updated',
                'error'
              )
            }  else {
              Swal.fire(
                  'Updated',
                  'Appointment has been updated.',
                  'success'
              )
            }
          }
          );
          } else {
            this.getall()
          }
      } else {
        pdate.setDate(1 + pdate.getDate());
        this.getall()
        Swal.fire(
          'Error!',
          'You can get Appointment after ' + pdate.toISOString().substring(0, 10) + ' 00:00',
          'error'
        )
      }

    }



  }


  eventDo(event) {
    const icon = this.renderer.createElement('mat-icon');
    const close = this.renderer.createText('close');
    this.renderer.addClass(icon, 'delete-icon');
    this.renderer.appendChild(icon, close);
    this.renderer.appendChild(event.el, icon)
    this.renderer.addClass(event.el, 'text-light')
  }




  //  Delete the appointment
  deleteAppointment(event) {
   console.log(event);
   if (event.event.title === this.tokenService.getEmail()){
     console.log(event.event);
     Swal.fire({
       title: 'Are you sure?',
       text: `Appointment will be deleted permanently`,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, cancel!',
       reverseButtons: true,
       preConfirm: (login) => {
         this.deleteAppointmentSub = this._ViewCalendarService.deleteAppointment(event.event.id).subscribe((data) => {
           console.log(data);
           if(data.success === true){
            this.getall();
           }
           if (!data.msg)
             Swal.showValidationMessage(
               `Request failed`
             )
         }
         )

       },
     }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire(
           'Cancelled',
           'Appointment was not deleted',
           'error'
         )
       } else {
         Swal.fire(
             'Deleted!',
             'Appointment has been deleted.',
             'success'
         )
       }
     });


   }
  }

  dayRender(ev) {
    ev.el.addEventListener('dblclick', () => {
      alert('double click!');
    });
  }

  ngOnDestroy() {

    if (this.deleteAppointmentSub !== undefined) {
      this.deleteAppointmentSub.unsubscribe();
    }
    if (this.getAllSub !== undefined) {
      this.getAllSub.unsubscribe();
    }
    if (this.createAppointmentSub !== undefined) {
      this.createAppointmentSub.unsubscribe();
    }
    if (this.createAppointment1Sub !== undefined) {
      this.createAppointment1Sub.unsubscribe();
    }
    if (this.updateAppointmentSub !== undefined) {
      this.updateAppointmentSub.unsubscribe();
    }
  }

  overlap(stillEvent, movingEvent) {
    return stillEvent.allDay && movingEvent.allDay;
  }
}
