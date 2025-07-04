# routers/dashboard_routes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from auth.dependencies import get_current_user, get_db
from models.user import User
from models.product import Product
from models.expense import Expense

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    total_products = db.query(func.count(Product.id)).scalar()
    low_stock = db.query(func.count(Product.id)).filter(Product.quantity < 5).scalar()
    monthly_expense = db.query(func.sum(Expense.amount)).scalar() or 0

    expense_by_category = (
        db.query(Expense.category, func.sum(Expense.amount).label("total"))
        .group_by(Expense.category)
        .all()
    )

    return {
        "total_products": total_products,
        "low_stock": low_stock,
        "monthly_expense": monthly_expense,
        "expense_by_category": [
            {"category": c, "total": t} for c, t in expense_by_category
        ],
    }
