import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective,FormControl} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../shared/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  public addUserForm:FormGroup = new FormGroup({});
 public  emailPattern = '/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/';//'^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
 public phoneNumber = "^((\\+91-?)|0)?[0-9]{10}$";
 public editObj;

  constructor(private fb:FormBuilder,
    private apieService: ApiserviceService, 
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {

   this.route.snapshot.paramMap.get('userobj');
   console.log("captured",this.route.snapshot.paramMap.get('userobj'))
   this.createUserForm();
    if(this.route.snapshot.paramMap.get('userobj')){
      console.log("on edit");
      this.editForm(this.route.snapshot.paramMap.get('userobj'));
    }
    

    
  }

  editForm(receivedObj){

this.editObj=JSON.parse(receivedObj);

console.log("edit",this.editObj);
    this.addUserForm.patchValue({
      name:this.editObj?.name,
      emailval:this.editObj?.email,
      phone:this.editObj?.phone,
      website:this.editObj.website
      
    })
  }



  createUserForm(){
    this.addUserForm=this.fb.group({
      name:new FormControl( '',Validators.required),
      emailval:new FormControl('',[Validators.required,Validators.email]),
      phone:new FormControl( '',Validators.required),
      website:new FormControl( '')

    })
  }
  get emailval() {
    return this.addUserForm.get('email');
}

  onUserAdd(){

if(this.addUserForm.valid){

  const obj={
  "name":this.addUserForm.value.name,
  "email":this.addUserForm.value.emailval,
  "phone":this.addUserForm.value.phone,
  "website":this.addUserForm.value.website
  }

console.log("addobj",obj);

this.apieService.createUser(obj).subscribe((res)=>{

if(res?.id){
  alert("User add / Updated succesfully.")
}
this.addUserForm.reset();
})

}
else{
  this.markFormGroupTouched(this.addUserForm)
}
  }

  markFormGroupTouched(formGroup: FormGroup){

(Object as any).values(formGroup.controls).forEach((control:FormGroup)=>{

  control.markAsTouched();
  if(control.controls){
    this.markFormGroupTouched(control);
  }

})

  }


  hasError(controlName:string,errorName:string){

    return this.addUserForm.controls[controlName].hasError(errorName)
  }

  gotoList(){
  
    this.router.navigate(['/listuser']);
  }
}
