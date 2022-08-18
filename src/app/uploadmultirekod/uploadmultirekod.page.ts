import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  ) {
    this.crud.getdatabelumupload();
    this.databanyakjson=JSON.stringify(this.crud.datanotupload);
   }
  databanyakjson:any;
  ngOnInit() {
    
  }//

  headers:HttpHeaders;
  urlinsertbanyak:any="https://khirulnizam.com/training/2fgvinsertbanyak.php";
  uploadrekods(){
    this.headers=new HttpHeaders();
    this.headers.append('ContentType','application/json');
    this.http.post(this.urlinsertbanyak,this.crud.datanotupload,{headers:this.headers})
      .subscribe(data=>{
        alert("BERJAYA upload bnayak"+JSON.stringify(data));
      },error=>{
          alert("TAK berjaya upload bnayak"+JSON.stringify(error));
        });
  }//end uploadrekods

}
