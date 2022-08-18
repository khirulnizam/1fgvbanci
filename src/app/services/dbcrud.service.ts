//file name: dbcrud.service.ts
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbcrudService {
  private dbinstance: SQLiteObject;
  dbname:string="bancipokok.db";
  tblname:string="tblbancipokok";

  constructor(
    private platform:Platform,
    private sqlite:SQLite,
  ) { 
    //invoke db instance
    this.databaseConn();
  }//end constructor


    //define database & create tables
    /*
  CREATE TABLE tblbancipokok (
	nopokok	TEXT NOT NULL,
	biltandan	INTEGER,catatan	TEXT,
	statusupload	INTEGER,
	PRIMARY KEY(nopokok) );*/

  sqlcreate:string;

  databaseConn() {
    this.sqlcreate="CREATE TABLE IF NOT EXISTS tblbancipokok "+
    "(nopokok	TEXT NOT NULL PRIMARY KEY,"+
    "biltandan	INTEGER,catatan	TEXT,"+
    "statusupload	INTEGER );"+
    "INSERT OR IGNORE INTO (nopokok,biltandan,catatan,statusupload)"+
    "VALUES('kl1223232',5,'saya',0)";

    this.platform.ready().then(() => {
      this.sqlite.create({
          name: this.dbname,
          location: 'default'
        }).then((sqLite: SQLiteObject) => {
          this.dbinstance = sqLite;
          sqLite.executeSql("CREATE TABLE IF NOT EXISTS tblbancipokok "+
          "(nopokok	TEXT PRIMARY KEY,"+
          "biltandan	INTEGER,catatan	TEXT,"+
          "statusupload	INTEGER );", [])
            .then((res) => {
              // alert(JSON.stringify(res));

              //invoke getallpokok
              this.getallpokok();
              alert("alldatapokok: "+JSON.stringify(this.alldatapokok));
            })
            .catch((error) => alert(JSON.stringify(error)));
        })
        .catch((error) => alert(JSON.stringify(error)));
    });   
  }

  // insert record
  sqlinsert:string;
  public addpokok(nopokok,biltandan,catatan) {

    // validation
    if (!nopokok.length ) { 
      alert('Sertakan nombor pokok');
      return;
    }
    this.dbinstance.executeSql("INSERT OR IGNORE INTO tblbancipokok (nopokok, biltandan,catatan,statusupload) VALUES ('"+nopokok+"','"+biltandan+"','"+catatan+"',0);", [])
      .then(() => {
        alert("Success");
        this.getallpokok();
      }, (e) => {
        alert(JSON.stringify(e.err));
      });
  }

  alldatapokok:Array<any>;//hold all record pokok
  getallpokok() {
    return this.dbinstance.executeSql("SELECT * FROM tblbancipokok", []).then((res) => {
      this.alldatapokok = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.alldatapokok.push(res.rows.item(i));
        }
        return this.alldatapokok;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  // Update
  updatepokok(nopokok, biltandan, catatan,statusupload) {
    let data = [nopokok, biltandan, catatan,statusupload];
    return this.dbinstance.executeSql("UPDATE ${this.tblname} SET biltandan = ?, catatan = ? WHERE nopokok = ${nopokok}", data);
  }  

  // Delete
  deletepokok(nopokok) {
    this.dbinstance.executeSql("DELETE FROM ${this.tblname} WHERE nopokok = ${nopokok}", [])
      .then(() => {
        alert("User deleted!");
        this.getallpokok();
      })
      .catch(e => {
        alert(JSON.stringify(e))
      });
  }
}
