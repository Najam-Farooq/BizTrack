from sqlalchemy import Column, Integer, String, Float, Date
from database import Base
import datetime

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String(255), nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String(100))
    date = Column(Date, default=datetime.date.today)
