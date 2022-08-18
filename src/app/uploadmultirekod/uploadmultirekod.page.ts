import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DbcrudService } from '../services/dbcrud.service';

@Component({
  selector: 'app-uploadmultirekod',
  templateUrl: './uploadmultirekod.page.html',
  styleUrls: ['./uploadmultirekod.page.scss'],
})
export class UploadmultirekodPage implements OnInit {

  constructor(
    private crud:DbcrudService,
    private http:HttpClient
  ) { }
  databanyakjson:any;
  ngOnInit() {
    this.crud.getdatabelumupload();
    this.databanyakjson=JSON.stringify(this.crud.datanotupload);
  }


}
