from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models import Products
from database import session_local, engine
import database_models
from sqlalchemy.orm import session

app = FastAPI()

origins = [
    "http://localhost:3000", # Next.js runs here by default
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database_models.Base.metadata.create_all(bind=engine)

# In-memory database
products = [
    Products(id=1, name='mobile', price= 4, description='budget phone', quantity=4),
    Products(id=2, name='mobile', price = 3, description='budget phone', quantity=4),
    Products(id=5, name='laptop', price = 10, description='budget laptop', quantity=2),
]

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()

def init_db():
    db = session_local()
    
    try:
        count = db.query(database_models.Products).count() 
        
        print(f"Current count in DB: {count}")

        if count == 0:
            print("Database is empty. Seeding data...")
            for item in products:
                # item is the Pydantic model from your list
                db_item = database_models.Products(**item.model_dump())
                db.add(db_item)
            
            db.commit()
            print("Data successfully added!")
        else:
            print("Database already has data. Skipping init.")
            
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close() # Always close the session!

init_db()


@app.get("/")
def home():
    return {"message": "Hello! Welcome to the FASTAPI Tutorial."}

# 1. Use standard naming (/products) and Response Model for documentation
@app.get("/products", response_model=List[Products])
async def get_all_products(db:session_local = Depends(get_db)):
    db_products = db.query(database_models.Products).all()
    return db_products

@app.get('/products/{id}', response_model=Products)
async def get_products_by_id(id: int, db:session_local = Depends(get_db)):
    db_products = db.query(database_models.Products).filter(database_models.Products.id == id).first()
    if db_products:
        return db_products
    
    raise HTTPException(status_code=404, detail="Product not found")

@app.post('/products', response_model=Products)
async def add_product(item: Products, db:session_local = Depends(get_db)):
    db_item = database_models.Products(**item.model_dump())
    db.add(db_item)
    db.commit()
    return db_item # Standard practice: return the created item, not the whole list

# 3. Use the Pydantic Model for updates too!
@app.put('/products/{id}', response_model=Products)
async def update_product(id: int, updated_item: Products, db:session_local = Depends(get_db)):
    db_products = db.query(database_models.Products).filter(database_models.Products.id == id).first()   
    if db_products:
        db_products.name = updated_item.name
        db_products.price = updated_item.price
        db_products.description = updated_item.description
        db_products.quantity = updated_item.quantity
        db.commit()
        return db_products
    raise HTTPException(status_code=404, detail="Product not found")

@app.delete('/products/{id}')
async def delete_product(id: int, db:session_local = Depends(get_db)):
    db_products = db.query(database_models.Products).filter(database_models.Products.id == id).first() 
    if db_products:
        db.delete(db_products)
        db.commit()
        return {"message": "Product deleted successfully"}       
    raise HTTPException(status_code=404, detail="Product not found")