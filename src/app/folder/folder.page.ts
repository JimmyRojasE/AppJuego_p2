import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireStoreService } from '../services/fire-store.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, private frbd:FireStoreService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  getAnimes(){
    const path="Animes"
    this.frbd.getCollection(path);
  }
}
