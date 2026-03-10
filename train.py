import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
import joblib
import os

# Create sample dataset
data = {
    "description": [
        "wireless bluetooth headphones with noise cancellation",
        "cotton t-shirt for men blue",
        "laptop computer with 16gb ram and 512gb ssd",
        "ceramic coffee mug 12oz",
        "leather wallet for men bi-fold",
        "smartphone with 128gb storage oled display",
        "running shoes sneakers for Women size 8",
        "wooden dining table oak finish",
        "stainless steel water bottle insulated",
        "plastic food storage containers tupperware"
    ],
    "hs_code": [
        "8518.30", # Headphones
        "6109.10", # T-shirts, cotton
        "8471.30", # Portable automatic data processing machines
        "6912.00", # Ceramic tableware
        "4202.31", # Articles of a kind normally carried in the pocket or in the handbag
        "8517.12", # Telephones for cellular networks
        "6404.11", # Sports footwear
        "9403.60", # Other wooden furniture
        "7323.93", # Table, kitchen or other household articles of stainless steel
        "3924.10"  # Tableware, kitchenware, other household articles of plastics
    ]
}

def train_model():
    print("Initializing dataset...")
    df = pd.DataFrame(data)
    X = df["description"]
    y = df["hs_code"]

    print("Building NLP Pipeline (TF-IDF + RandomForest)...")
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(stop_words='english', max_features=5000)),
        ('clf', RandomForestClassifier(n_estimators=100, random_state=42))
    ])

    print("Training the model...")
    pipeline.fit(X, y)
    print("Training complete.")

    # Save model
    os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
    model_path = os.path.join(os.path.dirname(__file__), "hs_model.joblib")
    joblib.dump(pipeline, model_path)
    print(f"Model saved to {model_path}.")

if __name__ == "__main__":
    train_model()
