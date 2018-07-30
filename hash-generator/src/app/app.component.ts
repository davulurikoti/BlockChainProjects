import { Component } from '@angular/core';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nonce :string = ' ';
  nonceOutput:string = ' ';
  output :string=crypto.HmacSHA256('', crypto.SHA256("key")).toString();;
  onSearchChange(searchValue : string ) {  
    this.output = crypto.HmacSHA256(searchValue, crypto.SHA256("key")).toString();
  }
}
