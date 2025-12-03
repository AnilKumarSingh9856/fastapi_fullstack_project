from pydantic import BaseModel, field_validator

class Products(BaseModel):
    id: int
    name: str
    price: float
    description: str
    quantity: int

    # Validator 1: Ensure quantity is not negative
    @field_validator('quantity')
    @classmethod
    def check_positive(cls, v: int):
        if v < 0:
            raise ValueError('Quantity cannot be negative')
        return v

    # Validator 2: Ensure name is not empty or just whitespace
    @field_validator('name')
    @classmethod
    def name_must_be_valid(cls, v: str):
        if len(v.strip()) == 0:
            raise ValueError('Name cannot be empty')
        if "admin" in v.lower():
            raise ValueError('You cannot use "admin" as a product name')
        return v