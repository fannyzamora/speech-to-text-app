from .database import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime


class Transcript(Base):
    __tablename__ = 'transcript'
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    creation_date = Column(DateTime, default=datetime.utcnow)

