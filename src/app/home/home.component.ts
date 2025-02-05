import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  stats: any;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getStats().subscribe(
      (data) => {
        this.stats = data[0];
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    );
  }
}
