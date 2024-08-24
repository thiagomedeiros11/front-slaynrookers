import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Character {
  name: string;
  level: number;
  points: number;
}

@Injectable({
  providedIn: 'root'
})

export class HighscoresService {
  private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getHighscores(): Observable<Character[]> {
      return this.http.get<Character[]>(`${this.apiUrl}?t=${new Date().getTime()}`, {
        headers: {'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });
    }
}
