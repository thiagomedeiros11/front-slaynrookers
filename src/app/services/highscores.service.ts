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
  private apiUrl = 'http://localhost:3000/api/highscores';

    constructor(private http: HttpClient) {}

    getHighscores(): Observable<Character[]> {
      return this.http.get<Character[]>(this.apiUrl);
    }
}
