import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HighscoresService, Character } from './services/highscores.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  highscores: Character[] =[];

  constructor(private highscoresService: HighscoresService) {}

  ngOnInit() {
    this.highscoresService.getHighscores().subscribe(
      (data: Character[]) => {
        this.highscores = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
