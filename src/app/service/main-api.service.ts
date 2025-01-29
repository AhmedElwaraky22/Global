import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface FileResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})

export class MainApiService {

  constructor(private _HttpClient : HttpClient) { }


  getAllData():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}jobs/all?pagination_type=paginate&per_page=11`)
  }
}
