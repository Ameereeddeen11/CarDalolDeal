from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from .db import Base

class ModelBase(Base):
    __abstract__ = True
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

class User(ModelBase):
    __tablename__ = "users"

    username = Column(String, unique=True, index=True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String)
    password = Column(String)

    seller = relationship("Seller", back_populates="user_seller")
    buyer = relationship("Buyer", back_populates="user_buyer")
    favorite_user = relationship("Favorite", back_populates="user")

class Seller(ModelBase):
    __tablename__ = "seller"

    user_id = Column(Integer, ForeignKey("users.id"))
    car_id = Column(Integer, ForeignKey("cars.id"), nullable=False)
    price = Column(Integer, nullable=False)
    min_price = Column(Integer)
    sold = Column(Boolean, default=False, nullable=False)

    user_seller = relationship("User", back_populates="seller")
    car = relationship("Car", back_populates="seller")
    sold_seller = relationship("Sold", back_populates="seller")

class Buyer(ModelBase):
    __tablename__ = "buyer"

    user_id = Column(Integer, ForeignKey("users.id"))
    car_id = Column(Integer, ForeignKey("cars.id"))
    buyer_price = Column(Integer)
    max_buyer_price = Column(Integer) 

    user_buyer = relationship("User", back_populates="buyer")
    car = relationship("Car", back_populates="buyer")
    sold_buyer = relationship("Sold", back_populates="buyer")

class Sold(ModelBase):
    __tablename__ = "sold"

    seller_id = Column(Integer, ForeignKey("seller.id"))
    buyer_id = Column(Integer, ForeignKey("buyer.id"))
    sold_at = Column(DateTime)
    price = Column(Integer)
    seller_agreement = Column(Boolean)
    buyer_agreement = Column(Boolean)

    seller = relationship("Seller", back_populates="sold_seller")
    buyer = relationship("Buyer", back_populates="sold_buyer")

class CarBase(ModelBase):
    __abstract__ = True

    name = Column(String)

class Car(CarBase):
    __tablename__ = "cars"

    brand_id = Column(Integer, ForeignKey("brands.id"), nullable=False)
    model_id = Column(Integer, ForeignKey("models.id"), nullable=False)
    type_id = Column(Integer, ForeignKey("types.id"), nullable=False)
    fuel_id = Column(Integer, ForeignKey("fuels.id"), nullable=False)
    tachometer = Column(Integer, nullable=False)
    made_at = Column(Integer, nullable=False)
    description = Column(Text, nullable=False)
    car_body_id = Column(Integer, ForeignKey("car_bodies.id"), nullable=False)
    gearbox_id = Column(Integer, ForeignKey("gearboxes.id"), nullable=False)
    power = Column(Integer, nullable=False)
    place_of_sale = Column(String, nullable=False)
    country_of_car = Column(Integer, ForeignKey("countries.id"), nullable=False)
    history = Column(Text, nullable=False)

    brand = relationship("Brand", back_populates="car_brand")
    model = relationship("Model", back_populates="car_model")
    type = relationship("Type", back_populates="car_type")
    fuel = relationship("Fuel", back_populates="car_fuel")
    car_body = relationship("CarBody", back_populates="car")
    gearbox = relationship("Gearbox", back_populates="car_gearbox")
    country = relationship("Country", back_populates="car_country")
    image = relationship("Image", back_populates="car_image")
    seller = relationship("Seller", back_populates="car")
    buyer = relationship("Buyer", back_populates="car")
    favorite_car = relationship("Favorite", back_populates="car")

    def __repr__(self):
        return self.brand

class Favorite(ModelBase):
    __tablename__ = "favorites"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    car_id = Column(Integer, ForeignKey("cars.id"), nullable=False)

    user = relationship("User", back_populates="favorite_user")
    car = relationship("Car", back_populates="favorite_car")

class Brand(CarBase):
    __tablename__ = "brands"

    car_brand = relationship("Car", back_populates="brand")
    brand_model = relationship("Model", back_populates="model_brand")

    def __init__(self, name: str):
        self.name = name

    def __repr__(self):
        return self.name

class Model(CarBase):
    __tablename__ = "models"

    brand_id = Column(Integer, ForeignKey("brands.id"), nullable=False)
    type_id = Column(Integer, ForeignKey("types.id"), nullable=False)

    model_brand = relationship("Brand", back_populates="brand_model")
    model_type = relationship("Type", back_populates="type_model", foreign_keys=[type_id])
    car_model = relationship("Car", back_populates="model")

    def _init__(self, name: str):
        self.name = name

    def __repr__(self):
        return self.name

class Type(CarBase):
    __tablename__ = "types"

    type_model = relationship("Model", back_populates="model_type")
    car_type = relationship("Car", back_populates="type")

class Fuel(CarBase):
    __tablename__ = "fuels"

    car_fuel = relationship("Car", back_populates="fuel")

class CarBody(CarBase):
    __tablename__ = "car_bodies"

    car = relationship("Car", back_populates="car_body")

class Gearbox(CarBase):
    __tablename__ = "gearboxes"

    car_gearbox = relationship("Car", back_populates="gearbox")

class Image(ModelBase):
    __tablename__ = "images"

    url = Column(String, nullable=False)
    car_id = Column(Integer, ForeignKey("cars.id"), nullable=False)

    car_image = relationship("Car", back_populates="image")

class Country(CarBase):
    __tablename__ = "countries"

    car_country = relationship("Car", back_populates="country")