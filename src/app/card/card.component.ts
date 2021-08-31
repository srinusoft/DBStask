import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  constructor(private router:Router) { }

  @Input() userobj: any;

  @Output() editobj:EventEmitter<any>= new EventEmitter();

  ngOnInit(): void {
    console.log("obj==>",this.userobj)
  }
  Editdetails(obj){

    this.router.navigate(['/adduser',{userobj:JSON.stringify({"name":obj.name,"email":obj.email,"phone":obj.phone,"website":obj.website})}])

  }
}
