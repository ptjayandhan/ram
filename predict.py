import joblib
import os
import numpy as np

def predict_hs_code(description: str):
    """
    Given a product description, predict the 6-digit HS code.
    Returns the predicted code, confidence score, top 3 alternatives, and a reasoning snippet.
    """
    model_path = os.path.join(os.path.dirname(__file__), "hs_model.joblib")
    
    if not os.path.exists(model_path):
        # Fallback for when model is not trained yet
        return {
            "predicted_hs_code": "0000.00",
            "confidence_score": 0.0,
            "top_3_alternatives": [],
            "reasoning": "Model not found. Please train the model first."
        }

    pipeline = joblib.load(model_path)
    
    # Predict probabilities for all classes
    probabilities = pipeline.predict_proba([description])[0]
    classes = pipeline.classes_
    
    # Get top 4 predictions
    top_indices = np.argsort(probabilities)[::-1][:4]
    
    top_prediction = classes[top_indices[0]]
    top_confidence = round(probabilities[top_indices[0]] * 100, 2)
    
    alternatives = []
    for i in range(1, len(top_indices)):
        alt_code = classes[top_indices[i]]
        alt_conf = round(probabilities[top_indices[i]] * 100, 2)
        alternatives.append({"code": alt_code, "confidence": alt_conf})
        
    reasoning = f"The model identified key NLP tokens in '{description}' mapping to '{top_prediction}' based on TF-IDF weighting of historical customs data."

    return {
        "predicted_hs_code": top_prediction,
        "confidence_score": top_confidence,
        "top_3_alternatives": alternatives,
        "reasoning": reasoning
    }

if __name__ == "__main__":
    print(predict_hs_code("wireless bluetooth headphones"))
    print(predict_hs_code("cotton t-shirt blue"))
