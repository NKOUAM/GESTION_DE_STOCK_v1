import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { GeolocationService } from '../../services/geolocation.service';
import { WeatherService } from '../../services/weather.service';
import { TimeService } from '../../services/time.service';
import { WeatherCurrent } from '../../models/weather.model';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {
  totalCategorias = 0;
  totalFornecedores = 0;
  totalProdutos = 0;
  stockTotal = 0;

  city = '...';
  country = '';
  latitude: number | null = null;
  longitude: number | null = null;
  locationError = '';

  weather: WeatherCurrent | null = null;
  weatherLoading = false;
  weatherError = '';

  currentTime = '';
  currentDate = '';

  constructor(
    private api: ApiService,
    private geo: GeolocationService,
    private weatherApi: WeatherService,
    private timeApi: TimeService
  ) {}

  ngOnInit(): void {
    this.loadStock();
    this.loadLocation();
    this.timeApi.getCurrentTime().subscribe(() => this.tick());
    setInterval(() => this.tick(), 1000);
  }

  private loadStock(): void {
    this.api.getCategorias().subscribe(d => this.totalCategorias = d.length);
    this.api.getFornecedores().subscribe(d => this.totalFornecedores = d.length);
    this.api.getProdutos().subscribe(d => {
      this.totalProdutos = d.length;
      this.stockTotal = d.reduce((s, p) => s + (p.quantidade || 0), 0);
    });
  }

  private tick(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.currentDate = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  private loadLocation(): void {
    this.locationError = '';
    this.geo.getCurrentPosition().subscribe({
      next: (pos) => {
        this.latitude = pos.latitude;
        this.longitude = pos.longitude;
        this.geo.reverseGeocode(pos.latitude, pos.longitude).subscribe({
          next: (r: any) => {
            this.city = r.city || r.locality || 'Inconnu';
            this.country = r.countryName || '';
          },
          error: () => { this.city = 'Position inconnue'; }
        });
        this.loadWeather(pos.latitude, pos.longitude);
      },
      error: (e) => {
        this.locationError = e.message || 'Impossible d\'obtenir la position';
        this.city = 'Localisation refusée';
      }
    });
  }

  private loadWeather(lat: number, lon: number): void {
    this.weatherLoading = true;
    this.weatherError = '';
    this.weatherApi.getCurrentWeather(lat, lon).subscribe({
      next: (w) => { this.weather = w.current_weather; this.weatherLoading = false; },
      error: () => { this.weatherError = 'Météo indisponible'; this.weatherLoading = false; }
    });
  }

  weatherLabel(code: number): string { return this.weatherApi.weatherDescription(code); }
  refreshLocation(): void { this.loadLocation(); }
}
