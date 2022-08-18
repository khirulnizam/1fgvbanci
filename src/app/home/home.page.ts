import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { NetworkCheckerService } from '../services/network-checker.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { DbcrudService } from '../services/dbcrud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mainForm: FormGroup;//hold data from formgroup
  Data:any[] = []//hold resultsets of records
  qrpokok:any;

  constructor(
    private crud: DbcrudService,
    public formBuilder: FormBuilder,
    private http:HttpClient,
    private network: NetworkCheckerService
  ) {

    this.mainForm = this.formBuilder.group({
      nopokok: [''],//reset data form
      biltandan: [''],
      catatan: [''],});
      
  }

  preparedb(){
    this.crud.getallpokok();
    alert(JSON.stringify(this.crud.alldatapokok));
  }

  insertrecordsqlite(){
    this.crud.addpokok(this.mainForm.value.nopokok,
      this.mainForm.value.biltandan, 
      this.mainForm.value.catatan);
      //chck network availability
      //upload record
      //if succes upload , update status upload
      alert(JSON.stringify(this.crud.alldatapokok));
  }

  //handling qrcode-scanner
  scanActive: boolean=false;

  async checkScannerPermission(){
    return new Promise(async(resolve,reject)=>{
      const status=await BarcodeScanner.checkPermission({force:true});
      //sekiranya user benarkan
      if(status.granted){
        resolve(true);
      }else{
        resolve(false);
      }
    });
  }//end checkScannerPermission

  async startScanner(){
    //ask for permisssion
    const allowed=await this.checkScannerPermission();

    //sekirany dibenarkan
    if(allowed==true){
      this.scanActive=true;
      BarcodeScanner.hideBackground();
      //start the camera view to scan
      const result=await BarcodeScanner.startScan();

      if (result.hasContent){

        //deactivate camera view
        this.scanActive=false;
        //transfer data to form
        this.qrpokok=result.content;

      }else{
        alert ("Tiada data dari scanner");
      }//ada data dari qrscanner
    }else{
      alert ("Scanner tidak dibenarkan bekerja");
    }//permission

  }

  async ngOnInit() {
    await this.network.openCheckNetwork();
    await this.network.logNetworkState();
  }

  //url point to php file in server
  //urlinsertpokok:any="http://192.168.0.101/training/2fgvinsert.php";//local
  urlinsertpokok:any="https://khirulnizam.com/training/2fgvinsert.php";//online server

  headers:HttpHeaders;
  success:any;//accept server response {"success":1}
  datapokok:any;

  simpanPokok(){
    //assuming network is ok
    this.datapokok={
      'nopokok':this.mainForm.value.nopokok,
      'biltandan':this.mainForm.value.biltandan,
      'catatan':this.mainForm.value.catatan,
    };

    if(this.network.onlineIndicator==false){//network-service
      alert ("NO network available");
    }else{
      this.headers=new HttpHeaders();
        this.headers.append('ContentType', 'application/json');
        //transmit to server
        this.http.post(this.urlinsertpokok,this.datapokok,{headers:this.headers})
            .subscribe(data=>{
              this.success = data['success'];
              //console.log('berjaya');
              console.log(this.success);
              alert("Data pokok telah dihantar, terima kasih... success="+this.success);
          },error=> {
              //console.log('error');
              //console.log(this.success);
              alert("Maaf simpanan rekod ada masalah");
          });
        }//else if network available

  }//end simpanPokok

}//end class HomePage
