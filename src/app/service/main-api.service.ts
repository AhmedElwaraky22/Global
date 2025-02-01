import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Job } from '../interface/mainInterface';



@Injectable({
  providedIn: 'root'
})

export class MainApiService {


  constructor(private _HttpClient : HttpClient) { }


  getAllData(page: number, perPage: number): Observable<any> {
    return this._HttpClient.get(
      `${environment.apiUrl}jobs/all?pagination_type=paginate&page=${page}&per_page=${perPage}`
    );
  }















}
