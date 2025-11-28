from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from sqlalchemy.orm import Session
from pydantic import BaseModel

app = FastAPI()

models.Base.metadata.create_all(database.engine)

# Allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_database():
    db = database.SessionLocal()
    # return db as an object or else closes it 
    try:
        yield db
    finally:
        db.close()

# Method to write/save a new transcript
# Takes new transcript to be saved and database as arguments

class TranscriptCreate(BaseModel):
    text: str

@app.post('/transcripts/')
def save_transcript(transcript:TranscriptCreate, db:Session=Depends(get_database)):
    new_transcript = models.Transcript(text=transcript.text)
    db.add(new_transcript)
    db.commit()
    db.refresh(new_transcript)
    return new_transcript
    #raise HTTPException (status_code=)

@app.get('/transcripts/')
def get_transcript(db: Session=Depends(get_database)):
    return db.query(models.Transcript).all()