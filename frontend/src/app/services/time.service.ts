import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface TimeInfo {
  datetime: string;
  timezone: string;
  dayOfWeek: string;
  dayOfYear: number;
}

@Injectable({ providedIn: 'root' })
export class TimeService {
  private readonly base = 'https://worldtimeapi.org/api/ip';

  constructor(private http: HttpClient) {}

  getCurrentTime(): Observable<TimeInfo> {
    return this.http.get<any>(this.base).pipe(
      catchError(() => {
        const now = new Date();
        return of({
          datetime: now.toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          dayOfWeek: now.toLocaleDateString('fr-FR', { weekday: 'long' }),
          dayOfYear: Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
        });
      })
    );
  }
}
