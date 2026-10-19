# IEEE-CIS Fraud Detection: Research Replication & Full-Stack CI/CD Application

[![Full-stack CI](https://github.com/Babar-Malik-18/IEEE-CIS-Fraud-Detection/actions/workflows/ci.yml/badge.svg)](https://github.com/Babar-Malik-18/IEEE-CIS-Fraud-Detection/actions/workflows/ci.yml)
[![Deploy Angular to GitHub Pages](https://github.com/Babar-Malik-18/IEEE-CIS-Fraud-Detection/actions/workflows/pages.yml/badge.svg)](https://github.com/Babar-Malik-18/IEEE-CIS-Fraud-Detection/actions/workflows/pages.yml)

> **Live Static Demonstration**: [https://Babar-Malik-18.github.io/IEEE-CIS-Fraud-Detection/](https://Babar-Malik-18.github.io/IEEE-CIS-Fraud-Detection/)  
> **Source Repository**: [https://github.com/Babar-Malik-18/IEEE-CIS-Fraud-Detection](https://github.com/Babar-Malik-18/IEEE-CIS-Fraud-Detection)

---

## 1. Project Overview & Research Context

This project delivers an end-to-end, production-structured Machine Learning application that replicates research results from:

> **"Intelligent approach to detecting online fraudulent trading with solution for imbalanced data in fintech forensics"**  
> *Scientific Reports (Nature Portfolio), 2025, 15:17983.* [DOI: 10.1038/s41598-025-01223-8](https://doi.org/10.1038/s41598-025-01223-8)

The application packages a fitted, cost-sensitive **Random Forest Classifier** and **XGBoost Classifier** trained on the **IEEE-CIS Fraud Detection** benchmark (590,540 transactions, 68 engineered features, 3.50% fraud rate). It exposes a local **Flask REST API**, an **Angular 22** interactive forensics dashboard with dev proxy, automated **GitHub Actions CI/CD**, and static **GitHub Pages** deployment.

---

## 2. Replicated Research Benchmarks

Empirical evaluation on the full IEEE-CIS dataset test partition (118,108 transactions) vs. the published paper results:

| Model / Baseline | Accuracy | Precision | Recall | F1-Score | ROC-AUC | Latency (ms) | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Random Forest (Replicated - Our Model)** | **93.66%** | **33.32%** | **81.08%** | **47.23%** | **95.47%** | **0.0037 ms** | Packaged Primary |
| **Random Forest (Paper Table 7)** | 88.00% | 85.00% | 86.00% | 85.50% | 89.00% | 0.1500 ms | Paper Baseline |
| **XGBoost (Replicated)** | **88.63%** | **21.36%** | **83.81%** | **34.04%** | **94.29%** | **0.0008 ms** | Packaged Secondary |
| **Decision Tree (Replicated)** | 87.59% | 19.31% | 80.11% | 31.11% | 91.43% | 0.0005 ms | Replicated |
| **Logistic Regression (Replicated)** | 82.78% | 13.81% | 74.86% | 23.32% | 86.96% | 0.0010 ms | Replicated |
| **Logistic Regression (Paper Table 7)** | 80.00% | 77.00% | 75.00% | 76.00% | 81.00% | 0.1000 ms | Paper Baseline |
| **Proposed ABC Model (Paper Table 11)** | 93.60% | 87.50% | 82.00% | 84.70% | 97.00% | 0.1200 ms | Paper Proposed |

*Complete replication report is documented in [`docs/replication_report.md`](docs/replication_report.md).*

---

## 3. Architecture & Deployment Boundary

```
Browser / Angular Form (http://localhost:4200)
      |   POST /api/predict (JSON)
      v
Angular Dev Proxy (proxy.conf.json) -> Flask API (http://127.0.0.1:5000)
      | Validation -> Fitted Preprocessing -> Random Forest Pipeline
      v
JSON Prediction Response -> Angular Result Panel
-------------------------------------------------------------------------
Git Push -> GitHub Actions CI:
      ├── Backend Job: Python 3.12, Pytest (Structure + 4 API Tests)
      └── Frontend Job: Node 24, Angular Build, Artifact Upload
Git Push (main) -> GitHub Pages Workflow:
      └── Deploys Static Angular Dashboard (Pages Demo Mode)
```

> **Deployment Boundary Note**: GitHub Pages hosts only static client-side Angular assets. Live ML model execution requires the local Python Flask REST API running on port 5000. When hosted on GitHub Pages, the interface automatically detects static hosting and runs in demonstration mode.

---

## 4. Repository Structure

```
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Automated backend pytest & Angular build CI
│       └── pages.yml              # Static deployment to GitHub Pages
├── backend/
│   ├── app.py                     # Flask REST API (/health, /predict)
│   ├── requirements.txt           # Python dependencies
│   ├── make_payload.py            # Generates valid test payload from sample inputs
│   ├── test_pipeline.py           # Validates direct local model inference
│   ├── test_payload.json          # Verified 68-feature test payload
│   ├── models/
│   │   ├── model_bundle.joblib    # Fitted primary Random Forest bundle (10.4MB)
│   │   └── xgboost_bundle.joblib  # Fitted secondary XGBoost bundle (0.2MB)
│   └── tests/
│       ├── test_api.py            # 4 Pytest unit & integration tests
│       └── test_structure.py      # CI smoke test verifying source integrity
├── data/
│   ├── sample_inputs.csv          # Non-sensitive legitimate transaction record
│   ├── test_fraud_transaction.csv # Verified fraud transaction record
│   └── (large raw CSVs ignored via .gitignore)
├── docs/
│   ├── environment.txt            # Software versions & environment audit
│   ├── replication_report.md      # Full scientific replication report
│   ├── replication_results.csv    # Benchmark metric comparison table
│   └── ML_Full_Stack_CICD_Lab_Manual_Expanded.docx
├── frontend/
│   ├── proxy.conf.json            # Angular dev proxy forwarding /api -> Flask
│   ├── package.json               # Angular 22 dependencies & scripts
│   ├── angular.json               # Angular workspace configuration
│   └── src/app/
│       ├── feature-schema.ts      # 68-feature metadata, presets & schemas
│       ├── prediction.service.ts  # Angular HTTP client service
│       ├── app.ts                 # Standalone dashboard component logic
│       ├── app.html               # Accessible UI with presets, chips & badges
│       └── app.css                # Dark mode glassmorphic styling
├── notebooks/
│   ├── replicate_models.py        # Reproducible model training & benchmark script
│   └── IEEE_CIS_Fraud_Detection_ML.ipynb
├── .gitignore                     # Excludes virtualenvs, node_modules, and 200MB+ data
└── README.md                      # Comprehensive project documentation
```

---

## 5. Getting Started & Local Execution

### Prerequisites
- **Python**: 3.12+ ([Download](https://www.python.org/downloads/))
- **Node.js**: 20+ LTS ([Download](https://nodejs.org/))
- **Git**: 2.40+

### Step 1: Clone Repository & Set Up Virtual Environment

```bash
git clone https://github.com/Babar-Malik-18/IEEE-CIS-Fraud-Detection.git
cd IEEE-CIS-Fraud-Detection

# Create and activate Python virtual environment
py -3.12 -m venv .venv
.\.venv\Scripts\activate      # Windows PowerShell

# Install backend dependencies
pip install -r backend/requirements.txt
```

### Step 2: Run Backend Tests

```bash
pytest -v backend/tests/
```
Expected output: **5 passed**.

### Step 3: Start Terminal 1 (Flask REST API)

```bash
python backend/app.py
```
*Expected: Running on `http://127.0.0.1:5000` (`GET /health` returns status ok).*

### Step 4: Start Terminal 2 (Angular Frontend with Dev Proxy)

Open a new terminal window:

```bash
cd frontend
npm install
npx ng serve --proxy-config proxy.conf.json --open
```
*Expected: Opens browser at `http://localhost:4200` with the live fraud detection interface.*

---

## 6. API Reference

### `GET /health`
Returns server status, total required feature count, task type, and model version.
```json
{
  "features": 68,
  "model_version": "1.0",
  "status": "ok",
  "target_names": ["Legitimate", "Fraud"],
  "task": "classification"
}
```

### `POST /predict`
Accepts a JSON dictionary containing all 68 input features.
```bash
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d @backend/test_payload.json
```
Response:
```json
{
  "prediction": 0,
  "label": "Legitimate",
  "task": "classification",
  "probabilities": [0.9918, 0.0082],
  "disclaimer": "Research/teaching prototype only."
}
```

---

## 7. Model Features & Input Schema

The model evaluates **68 features** categorized into:
1. **Core Transaction**: `transaction_amt`, `log_amt`, `hour_of_day`, `day_of_week`, `product_cd`, `has_identity`
2. **Card & Location**: `card1` through `card6`, `addr1`, `addr2`, `dist1`, `dist2`
3. **Email & Accounts**: `purchaser_email_domain`, `recipient_email_domain`
4. **Behavioral Velocity Counters**: `C1` through `C14`
5. **Time Deltas**: `D1` through `D15`
6. **Cardholder Match Verification**: `M1_enc` through `M9_enc`
7. **Identity & Device Metadata**: `id_01` through `id_20`, `device_type`
8. **Engineered Risk Aggregates**: `card1_txn_count`, `card1_avg_amt`, `card1_historical_fraud_rate`, `email_historical_fraud_rate`, `amt_vs_card_avg_ratio`

---

## 8. Disclaimer & Research Ethics

This software is developed strictly as a research prototype and educational artifact. Model predictions must not be used as the sole basis for automated financial account freezing or denial of service without human review and adherence to applicable financial consumer regulations.
