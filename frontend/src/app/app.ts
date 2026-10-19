import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FEATURES,
  Feature,
  CATEGORIES,
  LEGIT_SAMPLE,
  FRAUD_SAMPLE,
} from './feature-schema';
import {
  PredictionService,
  PredictionResponse,
  HealthResponse,
} from './prediction.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly fields = FEATURES;
  readonly categories = CATEGORIES;
  selectedCategory = 'Core Transaction';

  readonly deployedStatic = !['localhost', '127.0.0.1'].includes(
    typeof window !== 'undefined' ? window.location.hostname : 'localhost'
  );

  values: Record<string, number | null> = {};
  loading = false;
  error = '';
  result: PredictionResponse | null = null;
  health: HealthResponse | null = null;

  activeTab: 'form' | 'metrics' | 'about' = 'form';

  private api = inject(PredictionService);

  ngOnInit() {
    this.loadSample('legit');
    this.checkHealth();
  }

  checkHealth() {
    if (!this.deployedStatic) {
      this.api.getHealth().subscribe({
        next: (data) => (this.health = data),
        error: () => {
          // Backend might be offline; normal in static/demo mode
        },
      });
    }
  }

  loadSample(type: 'legit' | 'fraud') {
    const sample = type === 'legit' ? LEGIT_SAMPLE : FRAUD_SAMPLE;
    for (const field of this.fields) {
      this.values[field.name] = sample[field.name] ?? 0;
    }
    this.error = '';
    this.result = null;
  }

  getFilteredFields(): Feature[] {
    if (this.selectedCategory === 'ALL') {
      return this.fields;
    }
    return this.fields.filter((f) => f.category === this.selectedCategory);
  }

  trackField(_index: number, field: Feature) {
    return field.name;
  }

  getFraudProbability(): number {
    if (!this.result?.probabilities || this.result.probabilities.length < 2) {
      return this.result?.prediction === 1 ? 100 : 0;
    }
    return Math.round(this.result.probabilities[1] * 1000) / 10;
  }

  getLegitProbability(): number {
    if (!this.result?.probabilities || this.result.probabilities.length < 1) {
      return this.result?.prediction === 0 ? 100 : 0;
    }
    return Math.round(this.result.probabilities[0] * 1000) / 10;
  }

  submit() {
    this.error = '';
    this.result = null;

    if (this.deployedStatic) {
      // Provide an educational static demo simulation when hosted on GitHub Pages
      this.loading = true;
      setTimeout(() => {
        const isLikelyFraud =
          (this.values['transaction_amt'] ?? 0) > 300 ||
          (this.values['card1_historical_fraud_rate'] ?? 0) > 0.05;
        this.result = {
          prediction: isLikelyFraud ? 1 : 0,
          label: isLikelyFraud ? 'Fraud' : 'Legitimate',
          task: 'classification',
          probabilities: isLikelyFraud ? [0.12, 0.88] : [0.98, 0.02],
          disclaimer:
            'Static GitHub Pages demo simulation. Start Flask + Angular locally for live model predictions.',
        };
        this.loading = false;
      }, 400);
      return;
    }

    const payload: Record<string, number> = {};
    for (const field of this.fields) {
      const val = this.values[field.name];
      if (val === null || val === undefined || isNaN(Number(val))) {
        this.error = `Please enter a valid numeric value for: ${field.label}`;
        this.selectedCategory = field.category;
        return;
      }
      payload[field.name] = Number(val);
    }

    this.loading = true;
    this.api.predict(payload).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        this.error =
          `API Error (${err.status || 'Connection Failed'}): ` +
          (err.error?.error ||
            err.message ||
            'Ensure Flask server is running in Terminal 1 at http://127.0.0.1:5000');
        this.loading = false;
      },
    });
  }
}
