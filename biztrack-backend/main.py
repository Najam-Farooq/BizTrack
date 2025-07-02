from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Add this EXACT block
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ✅ must match React origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Then include your routers
from routers import expense_routes, product_routes, dashboard_routes
app.include_router(dashboard_routes.router)
app.include_router(expense_routes.router)
app.include_router(product_routes.router)
