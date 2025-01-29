import { Component, Input, Output } from '@angular/core';
import { ChildComponent } from "../child/child.component";
import { MainApiService } from '../../service/main-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
  standalone: true,
  imports: [CommonModule, HttpClientModule],


})
export class ParentComponent {
  public usersData :any;

  constructor(
    private _mainApi: MainApiService
  ){}


  ngOnInit(){
    this.AllData()
  }

  AllData(){
    this._mainApi.getAllData().subscribe(
      (res)=>{
        this.usersData = res.data
        console.log(this.usersData);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
