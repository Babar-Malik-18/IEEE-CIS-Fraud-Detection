export type Feature = {
  name: string;
  label: string;
  kind: 'number' | 'category';
  category: string;
  required: boolean;
  min?: number;
  max?: number;
};

export const FEATURES: Feature[] = [
  {
    "name": "transaction_amt",
    "label": "Transaction Amount ($)",
    "kind": "number",
    "category": "Core Transaction",
    "required": true
  },
  {
    "name": "log_amt",
    "label": "Log Transaction Amount",
    "kind": "number",
    "category": "Core Transaction",
    "required": true
  },
  {
    "name": "hour_of_day",
    "label": "Hour of Day (0-23)",
    "kind": "number",
    "category": "Core Transaction",
    "required": true
  },
  {
    "name": "day_of_week",
    "label": "Day of Week (0-6)",
    "kind": "number",
    "category": "Core Transaction",
    "required": true
  },
  {
    "name": "product_cd",
    "label": "Product Code (Encoded)",
    "kind": "number",
    "category": "Core Transaction",
    "required": true
  },
  {
    "name": "has_identity",
    "label": "Identity Info Present (0/1)",
    "kind": "number",
    "category": "Core Transaction",
    "required": true
  },
  {
    "name": "card1",
    "label": "Card 1 (Issuer ID)",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "card2",
    "label": "Card 2 (Bank Code)",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "card3",
    "label": "Card 3 (Country Code)",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "card4",
    "label": "Card 4 (Network Freq)",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "card5",
    "label": "Card 5 (Card Category Freq)",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "card6",
    "label": "Card 6 (Card Type Freq)",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "addr1",
    "label": "Billing Address Region 1",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "addr2",
    "label": "Billing Address Region 2",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "dist1",
    "label": "Distance 1",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "dist2",
    "label": "Distance 2",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "purchaser_email_domain",
    "label": "Purchaser Email Domain Freq",
    "kind": "number",
    "category": "Email & Account",
    "required": true
  },
  {
    "name": "recipient_email_domain",
    "label": "Recipient Email Domain Freq",
    "kind": "number",
    "category": "Email & Account",
    "required": true
  },
  {
    "name": "C1",
    "label": "C1",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C2",
    "label": "C2",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C3",
    "label": "C3",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C4",
    "label": "C4",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C5",
    "label": "C5",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C6",
    "label": "C6",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C7",
    "label": "C7",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C8",
    "label": "C8",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C9",
    "label": "C9",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C10",
    "label": "C10",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C11",
    "label": "C11",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C12",
    "label": "C12",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C13",
    "label": "C13",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "C14",
    "label": "C14",
    "kind": "number",
    "category": "Velocity Counters (C)",
    "required": true
  },
  {
    "name": "D1",
    "label": "D1",
    "kind": "number",
    "category": "Time Deltas (D)",
    "required": true
  },
  {
    "name": "D2",
    "label": "D2",
    "kind": "number",
    "category": "Time Deltas (D)",
    "required": true
  },
  {
    "name": "D3",
    "label": "D3",
    "kind": "number",
    "category": "Time Deltas (D)",
    "required": true
  },
  {
    "name": "D4",
    "label": "D4",
    "kind": "number",
    "category": "Time Deltas (D)",
    "required": true
  },
  {
    "name": "D5",
    "label": "D5",
    "kind": "number",
    "category": "Time Deltas (D)",
    "required": true
  },
  {
    "name": "D10",
    "label": "D10",
    "kind": "number",
    "category": "Time Deltas (D)",
    "required": true
  },
  {
    "name": "D11",
    "label": "D11",
    "kind": "number",
    "category": "Time Deltas (D)",
    "required": true
  },
  {
    "name": "D15",
    "label": "D15",
    "kind": "number",
    "category": "Time Deltas (D)",
    "required": true
  },
  {
    "name": "M1_enc",
    "label": "M1_enc",
    "kind": "number",
    "category": "Match Verification (M)",
    "required": true
  },
  {
    "name": "M2_enc",
    "label": "M2_enc",
    "kind": "number",
    "category": "Match Verification (M)",
    "required": true
  },
  {
    "name": "M3_enc",
    "label": "M3_enc",
    "kind": "number",
    "category": "Match Verification (M)",
    "required": true
  },
  {
    "name": "M4_enc",
    "label": "M4_enc",
    "kind": "number",
    "category": "Match Verification (M)",
    "required": true
  },
  {
    "name": "M5_enc",
    "label": "M5_enc",
    "kind": "number",
    "category": "Match Verification (M)",
    "required": true
  },
  {
    "name": "M6_enc",
    "label": "M6_enc",
    "kind": "number",
    "category": "Match Verification (M)",
    "required": true
  },
  {
    "name": "M7_enc",
    "label": "M7_enc",
    "kind": "number",
    "category": "Match Verification (M)",
    "required": true
  },
  {
    "name": "M8_enc",
    "label": "M8_enc",
    "kind": "number",
    "category": "Match Verification (M)",
    "required": true
  },
  {
    "name": "M9_enc",
    "label": "M9_enc",
    "kind": "number",
    "category": "Match Verification (M)",
    "required": true
  },
  {
    "name": "id_01",
    "label": "id_01",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "id_02",
    "label": "id_02",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "id_03",
    "label": "id_03",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "id_05",
    "label": "id_05",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "id_06",
    "label": "id_06",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "id_09",
    "label": "id_09",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "id_11",
    "label": "id_11",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "id_13",
    "label": "id_13",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "id_17",
    "label": "id_17",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "id_19",
    "label": "id_19",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "id_20",
    "label": "id_20",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "device_type",
    "label": "Device Type Freq",
    "kind": "number",
    "category": "Device & Identity",
    "required": true
  },
  {
    "name": "card1_txn_count",
    "label": "Card 1 Historical Txn Count",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "card1_avg_amt",
    "label": "Card 1 Average Amount",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "card1_historical_fraud_rate",
    "label": "Card 1 Historical Fraud Rate",
    "kind": "number",
    "category": "Card & Location",
    "required": true
  },
  {
    "name": "email_txn_count",
    "label": "Email Domain Txn Count",
    "kind": "number",
    "category": "Email & Account",
    "required": true
  },
  {
    "name": "email_historical_fraud_rate",
    "label": "Email Domain Historical Fraud Rate",
    "kind": "number",
    "category": "Email & Account",
    "required": true
  },
  {
    "name": "is_high_risk_product",
    "label": "High Risk Product Flag (0/1)",
    "kind": "number",
    "category": "Risk Indicators",
    "required": true
  },
  {
    "name": "amt_vs_card_avg_ratio",
    "label": "Amount vs Card Avg Ratio",
    "kind": "number",
    "category": "Risk Indicators",
    "required": true
  }
];

export const LEGIT_SAMPLE: Record<string, number> = {
  "transaction_amt": 58.95,
  "log_amt": 4.093510881473524,
  "hour_of_day": 1.0,
  "day_of_week": 2.0,
  "product_cd": 439670.0,
  "has_identity": 0.0,
  "card1": 13899.0,
  "card2": 555.0,
  "card3": 150.0,
  "card4": 189217.0,
  "card5": 224.0,
  "card6": 439938.0,
  "addr1": 299.0,
  "addr2": 87.0,
  "dist1": 4.0,
  "dist2": 37.0,
  "purchaser_email_domain": 100934.0,
  "recipient_email_domain": 453249.0,
  "C1": 139.0,
  "C2": 107.0,
  "C3": 0.0,
  "C4": 0.0,
  "C5": 131.0,
  "C6": 106.0,
  "C7": 0.0,
  "C8": 0.0,
  "C9": 90.0,
  "C10": 0.0,
  "C11": 94.0,
  "C12": 0.0,
  "C13": 422.0,
  "C14": 98.0,
  "D1": 130.0,
  "D2": 130.0,
  "D3": 70.0,
  "D4": 129.0,
  "D5": 70.0,
  "D10": 129.0,
  "D11": 129.0,
  "D15": 129.0,
  "M1_enc": 1.0,
  "M2_enc": 1.0,
  "M3_enc": 1.0,
  "M4_enc": 0.0,
  "M5_enc": 0.0,
  "M6_enc": 1.0,
  "M7_enc": 0.0,
  "M8_enc": 0.0,
  "M9_enc": 1.0,
  "id_01": -5.0,
  "id_02": 125800.5,
  "id_03": 0.0,
  "id_05": 0.0,
  "id_06": 0.0,
  "id_09": 0.0,
  "id_11": 100.0,
  "id_13": 52.0,
  "id_17": 166.0,
  "id_19": 341.0,
  "id_20": 472.0,
  "device_type": 449730.0,
  "card1_txn_count": 18.0,
  "card1_avg_amt": 158.60555555555553,
  "card1_historical_fraud_rate": 0.0,
  "email_txn_count": 100934.0,
  "email_historical_fraud_rate": 0.0227574454594091,
  "is_high_risk_product": 1.0,
  "amt_vs_card_avg_ratio": 0.3716767662615153
};

export const FRAUD_SAMPLE: Record<string, number> = {
  "transaction_amt": 500.0,
  "log_amt": 6.2166061010848646,
  "hour_of_day": 15,
  "day_of_week": 3,
  "product_cd": 33024,
  "has_identity": 1,
  "card1": 6580,
  "card2": 284.0,
  "card3": 150.0,
  "card4": 384767,
  "card5": 100.0,
  "card6": 439938,
  "addr1": 469.0,
  "addr2": 87.0,
  "dist1": 8.0,
  "dist2": 37.0,
  "purchaser_email_domain": 228355,
  "recipient_email_domain": 57147,
  "C1": 1.0,
  "C2": 2.0,
  "C3": 0.0,
  "C4": 1.0,
  "C5": 0.0,
  "C6": 1.0,
  "C7": 0.0,
  "C8": 1.0,
  "C9": 0.0,
  "C10": 1.0,
  "C11": 1.0,
  "C12": 0.0,
  "C13": 0.0,
  "C14": 0.0,
  "D1": 0.0,
  "D2": 97.0,
  "D3": 8.0,
  "D4": 26.0,
  "D5": 10.0,
  "D10": 15.0,
  "D11": 43.0,
  "D15": 52.0,
  "M1_enc": 1.0,
  "M2_enc": 1.0,
  "M3_enc": 1.0,
  "M4_enc": 0.0,
  "M5_enc": 0.0,
  "M6_enc": 0.0,
  "M7_enc": 0.0,
  "M8_enc": 0.0,
  "M9_enc": 1.0,
  "id_01": 0.0,
  "id_02": 67653.0,
  "id_03": 0.0,
  "id_05": 3.0,
  "id_06": -10.0,
  "id_09": 0.0,
  "id_11": 100.0,
  "id_13": 52.0,
  "id_17": 166.0,
  "id_19": 561.0,
  "id_20": 350.0,
  "device_type": 55645,
  "card1_txn_count": 191,
  "card1_avg_amt": 122.91633507853402,
  "card1_historical_fraud_rate": 0.0785340314136125,
  "email_txn_count": 228355.0,
  "email_historical_fraud_rate": 0.0435418536927152,
  "is_high_risk_product": 0,
  "amt_vs_card_avg_ratio": 4.067807583756371
};

export const CATEGORIES: string[] = [
  'Core Transaction',
  'Card & Location',
  'Email & Account',
  'Risk Indicators',
  'Device & Identity',
  'Velocity Counters (C)',
  'Time Deltas (D)',
  'Match Verification (M)',
];
