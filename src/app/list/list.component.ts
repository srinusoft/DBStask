import { Component, OnInit } from '@angular/core';

import { ApiserviceService } from '../shared/apiservice.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  usersArray=[];

  constructor(private apiservice:ApiserviceService) { }

  ngOnInit(): void {

   this.apiservice.getUsers().subscribe((res)=>{

    this.usersArray=res;

    console.log("response=>",res);
   })

  }

}
