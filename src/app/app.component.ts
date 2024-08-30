import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HighscoresService, Character } from './services/highscores.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';

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

export class AppComponent implements OnInit, OnDestroy {

  highscores: Character[] = [];
  private interevalId: any;
  private subscription: Subscription = new Subscription();
  private isBrowser: boolean;

  constructor(
    private highscoresService: HighscoresService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      const storedHighscores = localStorage.getItem('highscores');

      if (storedHighscores) {
        this.highscores = JSON.parse(storedHighscores);
      }

      this.fetchHighscores();

      this.interevalId = setInterval(() => {
        this.fetchHighscores();
      }, 50000);
    }
  }

  fetchHighscores() {
    const subscription = this.highscoresService.getHighscores().subscribe(
      (data: Character[]) => {
        this.highscores = data;

        localStorage.setItem('highscores', JSON.stringify(data));
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.subscription.add(subscription);
  }

  ngOnDestroy() {
    if (this.interevalId) {
      clearInterval(this.interevalId);
    }
    this.subscription.unsubscribe();
  }
}
