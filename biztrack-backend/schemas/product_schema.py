from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str
    category: str
    price: float
    quantity: int

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    image: str | None = None

class Config:
    from_attributes = True

