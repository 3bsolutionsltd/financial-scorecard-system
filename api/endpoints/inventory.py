from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel, Field
from datetime import datetime
from models.database import SessionLocal
from models.inventory import InventoryItem

router = APIRouter(prefix="/inventory", tags=["Inventory"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class InventoryItemCreate(BaseModel):
    item_name: str = Field(...)
    quantity: int = Field(...)
    unit_price: float = Field(...)
    location: str = Field(None)

class InventoryItemUpdate(BaseModel):
    item_name: str = Field(None)
    quantity: int = Field(None)
    unit_price: float = Field(None)
    location: str = Field(None)

class InventoryItemResponse(BaseModel):
    id: int
    item_name: str
    quantity: int
    unit_price: float
    total_value: float
    location: str = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

@router.post("/", response_model=InventoryItemResponse)
def create_inventory_item(item: InventoryItemCreate, db: Session = Depends(get_db)):
    db_item = InventoryItem(
        item_name=item.item_name,
        quantity=item.quantity,
        unit_price=item.unit_price,
        location=item.location
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/{item_id}", response_model=InventoryItemResponse)
def get_inventory_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    return db_item

@router.put("/{item_id}", response_model=InventoryItemResponse)
def update_inventory_item(item_id: int, item: InventoryItemUpdate, db: Session = Depends(get_db)):
    db_item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    update_data = item.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_inventory_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    db.delete(db_item)
    db.commit()
    return {"detail": "Inventory item deleted"}

@router.get("/", response_model=List[dict])
def list_inventory_items(db: Session = Depends(get_db)):
    # Return empty list for now to get the frontend working
    return []
