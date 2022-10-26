import { Component, OnInit } from '@angular/core';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private fireBd:FireStoreService) { 
    console.log(fireBd.getUser());
     
  }

  ngOnInit() {
  }

}
