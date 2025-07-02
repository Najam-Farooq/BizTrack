from pydantic import BaseModel
from datetime import date

class ExpenseBase(BaseModel):
    description: str
    amount: float
    category: str
    # date: date | None = None

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseOut(ExpenseBase):
    id: int

    class Config:
        from_attributes = True  # Replaces 'orm_mode'
