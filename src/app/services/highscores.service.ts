import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Character {
  name: string;
  level: number;
  points: number;
}

@Injectable({
  providedIn: 'root'
})

export class HighscoresService {
  private apiUrl = 'https://back-slaynrookers.onrender.com/api/highscores';

    constructor(private http: HttpClient) {}

    getHighscores(): Observable<Character[]> {
      return this.http.get<Character[]>(this.apiUrl);
    }
}
