import streamlit as st
import pandas as pd
import numpy as np
import pickle
import os


# --------------------------------------------------
# Page Configuration
# --------------------------------------------------

st.set_page_config(
    page_title="IEEE-CIS Fraud Detection",
    page_icon="💳",
    layout="wide"
)


# --------------------------------------------------
# Load Model and Artifacts
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_FILE = os.path.join(BASE_DIR, "fraud_model.pkl")
FEATURE_FILE = os.path.join(BASE_DIR, "feature_columns.pkl")
PREPROCESSING_FILE = os.path.join(BASE_DIR, "preprocessing_artifacts.pkl")


@st.cache_resource
def load_model():
    with open(MODEL_FILE, "rb") as file:
        return pickle.load(file)


@st.cache_resource
def load_features():
    with open(FEATURE_FILE, "rb") as file:
        return pickle.load(file)


@st.cache_resource
def load_preprocessing():
    with open(PREPROCESSING_FILE, "rb") as file:
        return pickle.load(file)


try:
    model = load_model()
    feature_columns = load_features()
    preprocessing = load_preprocessing()

except Exception as e:
    st.error("Unable to load the model or required files.")
    st.code(str(e))
    st.stop()


feature_medians = preprocessing["feature_medians"]
frequency_mappings = preprocessing["frequency_mappings"]
categorical_columns = preprocessing["categorical_columns"]


# --------------------------------------------------
# Title
# --------------------------------------------------

st.title("💳 IEEE-CIS Fraud Detection System")

st.write(
    "Enter transaction information below to check whether the "
    "transaction is likely to be fraudulent or legitimate."
)


# --------------------------------------------------
# Helper Function
# --------------------------------------------------

def prepare_manual_transaction(
    amount,
    hour,
    product,
    card_type,
    card_category,
    device,
    purchaser_email,
    recipient_email
):
    # Start with median values for all 68 model features
    data = feature_medians.copy()

    # Transaction amount
    if "transaction_amt" in data:
        data["transaction_amt"] = amount

    if "transaction_amount" in data:
        data["transaction_amount"] = amount

    # Try common hour feature names
    hour_features = [
        "hour",
        "transaction_hour",
        "transaction_ts_hour"
    ]

    for col in hour_features:
        if col in data:
            data[col] = hour

    # Categorical frequency encoding
    values = {
        "product_cd": product,
        "card4": card_type,
        "card6": card_category,
        "device_type": device,
        "purchaser_email_domain": purchaser_email,
        "recipient_email_domain": recipient_email
    }

    for column, value in values.items():

        if column in frequency_mappings:

            mapping = frequency_mappings[column]

            # Use frequency if value exists
            if value in mapping:
                data[column] = mapping[value]

            else:
                # Unknown category gets 0
                data[column] = 0

    # Create DataFrame with EXACT model feature order
    transaction = pd.DataFrame([data])

    transaction = transaction.reindex(columns=feature_columns)

    # Replace any missing values
    transaction = transaction.fillna(0)

    # Replace infinite values
    transaction = transaction.replace(
        [np.inf, -np.inf],
        0
    )

    return transaction


# --------------------------------------------------
# Prediction Function
# --------------------------------------------------

def make_prediction(transaction):

    prediction = model.predict(transaction)[0]

    probabilities = model.predict_proba(transaction)[0]

    legitimate_probability = probabilities[0]
    fraud_probability = probabilities[1]

    return (
        prediction,
        legitimate_probability,
        fraud_probability
    )


# --------------------------------------------------
# Display Result
# --------------------------------------------------

def display_result(prediction, legitimate_probability, fraud_probability):

    st.divider()

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric(
            "Fraud Probability",
            f"{fraud_probability * 100:.2f}%"
        )

    with col2:
        st.metric(
            "Legitimate Probability",
            f"{legitimate_probability * 100:.2f}%"
        )

    with col3:

        if prediction == 1:
            st.error("🚨 FRAUD")
        else:
            st.success("✅ LEGITIMATE")

    if prediction == 1:
        st.warning(
            "The model classified this transaction as potentially fraudulent."
        )
    else:
        st.success(
            "The model classified this transaction as legitimate."
        )


# --------------------------------------------------
# Tabs
# --------------------------------------------------

tab1, tab2, tab3 = st.tabs(
    [
        "🧑 Manual Transaction",
        "🧪 Test Examples",
        "📂 CSV Upload"
    ]
)


# ==================================================
# TAB 1 — MANUAL TRANSACTION
# ==================================================

with tab1:

    st.subheader("Enter Transaction Details")

    col1, col2 = st.columns(2)

    with col1:

        amount = st.number_input(
            "Transaction Amount",
            min_value=0.0,
            value=50.0,
            step=1.0
        )

        hour = st.slider(
            "Transaction Hour",
            min_value=0,
            max_value=23,
            value=12
        )

        product = st.selectbox(
            "Product Code",
            [
                "W",
                "C",
                "R",
                "H",
                "S"
            ]
        )

        card_type = st.selectbox(
            "Card Type",
            [
                "discover",
                "mastercard",
                "visa",
                "american express"
            ]
        )

    with col2:

        card_category = st.selectbox(
            "Card Category",
            [
                "credit",
                "debit"
            ]
        )

        device = st.selectbox(
            "Device Type",
            [
                "desktop",
                "mobile"
            ]
        )

        purchaser_email = st.selectbox(
            "Purchaser Email Domain",
            [
                "gmail.com",
                "yahoo.com",
                "hotmail.com",
                "anonymous.com"
            ]
        )

        recipient_email = st.selectbox(
            "Recipient Email Domain",
            [
                "gmail.com",
                "yahoo.com",
                "hotmail.com",
                "anonymous.com"
            ]
        )

    st.info(
        "The model uses 68 features. The fields not entered manually "
        "are automatically filled using the training-data baseline values."
    )

    if st.button(
        "🔍 Check Transaction",
        type="primary",
        use_container_width=True
    ):

        transaction = prepare_manual_transaction(
            amount,
            hour,
            product,
            card_type,
            card_category,
            device,
            purchaser_email,
            recipient_email
        )

        prediction, legitimate_probability, fraud_probability = (
            make_prediction(transaction)
        )

        display_result(
            prediction,
            legitimate_probability,
            fraud_probability
        )


# ==================================================
# TAB 2 — TEST EXAMPLES
# ==================================================

with tab2:

    st.subheader("Test the Model with Real Transactions")

    st.write(
        "These examples use real transactions from the IEEE-CIS dataset "
        "and contain all 68 model features."
    )

    col1, col2 = st.columns(2)

    with col1:

        if st.button(
            "🚨 Test Fraud Example",
            use_container_width=True
        ):

            st.session_state["test_type"] = "fraud"

    with col2:

        if st.button(
            "✅ Test Legitimate Example",
            use_container_width=True
        ):

            st.session_state["test_type"] = "legitimate"


    # --------------------------------------------------
    # Load test transaction
    # --------------------------------------------------

    test_type = st.session_state.get("test_type", None)

    if test_type:

        st.divider()

        st.write(
            f"**Selected Test:** {test_type.title()} Transaction"
        )

        # Look for test transaction files
        fraud_file = os.path.join(
            BASE_DIR,
            "test_fraud_transaction.csv"
        )

        legitimate_file = os.path.join(
            BASE_DIR,
            "test_legitimate_transaction.csv"
        )

        selected_file = (
            fraud_file
            if test_type == "fraud"
            else legitimate_file
        )

        if not os.path.exists(selected_file):

            st.error(
                f"{os.path.basename(selected_file)} was not found."
            )

            st.info(
                "Create the two test CSV files from your Colab dataset "
                "and place them in the same folder as app.py."
            )

        else:

            test_transaction = pd.read_csv(selected_file)

            # Keep only model features and exact order
            test_transaction = test_transaction.reindex(
                columns=feature_columns
            )

            test_transaction = test_transaction.fillna(0)

            test_transaction = test_transaction.replace(
                [np.inf, -np.inf],
                0
            )

            prediction, legitimate_probability, fraud_probability = (
                make_prediction(test_transaction)
            )

            if test_type == "fraud":

                st.warning(
                    "This is a real fraud transaction from the test data."
                )

            else:

                st.success(
                    "This is a real legitimate transaction from the test data."
                )

            display_result(
                prediction,
                legitimate_probability,
                fraud_probability
            )

            with st.expander("View Transaction Features"):

                st.dataframe(
                    test_transaction,
                    use_container_width=True
                )


# ==================================================
# TAB 3 — CSV UPLOAD
# ==================================================

with tab3:

    st.subheader("Upload a Model-Ready Transaction")

    st.write(
        "Upload a CSV containing the 68 features required by the model."
    )

    uploaded_file = st.file_uploader(
        "Choose CSV file",
        type=["csv"]
    )

    if uploaded_file is not None:

        try:

            uploaded_data = pd.read_csv(uploaded_file)

            st.write("Uploaded Data:")
            st.dataframe(
                uploaded_data,
                use_container_width=True
            )

            missing_features = [
                col
                for col in feature_columns
                if col not in uploaded_data.columns
            ]

            if missing_features:

                st.error(
                    f"The CSV is missing {len(missing_features)} "
                    "required model features."
                )

                st.write("Missing features:")
                st.write(missing_features)

            else:

                model_data = uploaded_data[
                    feature_columns
                ].copy()

                model_data = model_data.fillna(0)

                model_data = model_data.replace(
                    [np.inf, -np.inf],
                    0
                )

                if st.button(
                    "🔍 Check Uploaded Transaction",
                    type="primary",
                    use_container_width=True
                ):

                    prediction, legitimate_probability, fraud_probability = (
                        make_prediction(model_data)
                    )

                    display_result(
                        prediction,
                        legitimate_probability,
                        fraud_probability
                    )

        except Exception as e:

            st.error("Error processing the CSV file.")
            st.code(str(e))


# --------------------------------------------------
# Footer
# --------------------------------------------------

st.divider()

st.caption(
    "IEEE-CIS Fraud Detection | Random Forest Model | "
    "Machine Learning Project"
)