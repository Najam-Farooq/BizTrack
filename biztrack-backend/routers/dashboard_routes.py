from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import SessionLocal
from models.product import Product
from models.expense import Expense
from datetime import datetime

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def dashboard_summary(db: Session = Depends(get_db)):
    # Total products
    total_products = db.query(func.count(Product.id)).scalar()

    # Low stock (quantity < 10)
    low_stock = db.query(func.count(Product.id)).filter(Product.quantity < 10).scalar()

    # Total expense for current month
    now = datetime.now()
    total_monthly_expense = db.query(func.sum(Expense.amount)).filter(
        func.extract("month", Expense.date) == now.month,
        func.extract("year", Expense.date) == now.year
    ).scalar() or 0

    # Expense breakdown by category
    expense_by_category = db.query(
        Expense.category,
        func.sum(Expense.amount).label("total")
    ).group_by(Expense.category).all()

    return {
        "total_products": total_products,
        "low_stock": low_stock,
        "monthly_expense": total_monthly_expense,
        "expense_by_category": [
            {"category": cat, "total": float(total)} for cat, total in expense_by_category
        ]
    }
