from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import endpoints

app = FastAPI(
    title="JVY Group - AI Customs Automation API",
    description="Modular FastAPI backend for AI-driven Customs Automation system",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the JVY Group AI Customs Automation API"}
