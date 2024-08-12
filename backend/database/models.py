from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .db import Base

class ModelBase(Base):
    __abstract__ = True
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True, index=True)

class User(ModelBase):
    __tablename__ = "users"

    username = Column(String, unique=True, index=True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String)
    password = Column(String)

    seller = relationship("Seller", back_populates="user_seller")
    buyer = relationship("Buyer", back_populates="user_buyer")

class Seller(ModelBase):
    __tablename__ = "seller"

    user_id = Column(Integer, ForeignKey("users.id"))
    car_id = Column(Integer, ForeignKey("cars.id"))
    price = Column(Integer)

    user_seller = relationship("User", back_populates="seller")
    car = relationship("Car", back_populates="car_seller")

class Buyer(ModelBase):
    __tablename__ = "buyer"

    user_id = Column(Integer, ForeignKey("users.id"))
    car_id = Column(Integer, ForeignKey("cars.id"))

    user_buyer = relationship("User", back_populates="buyer")
    car = relationship("Car", back_populates="car_buyer")

class Car(ModelBase):
    __tablename__ = "cars"

    brand_id = Column(Integer, ForeignKey("brands.id"))
    model_id = Column(Integer, ForeignKey("models.id"))
    type_id = Column(Integer, ForeignKey("types.id"))
    fuel_id = Column(Integer, ForeignKey("fuels.id"))
    tachometer = Column(Integer)

    brand = relationship("Brand", back_populates="car_brand")
    model = relationship("Model", back_populates="car_model")
    type = relationship("Type", back_populates="car_type")
    fuel = relationship("Fuel", back_populates="car_fuel")
    image = relationship("Image", back_populates="car_image")

class Brand(ModelBase):
    __tablename__ = "brands"

    name = Column(String)

    car_model = relationship("Car", back_populates="brand")
    brand_model = relationship("Model", back_populates="model_brand")

class Model(ModelBase):
    __tablename__ = "models"

    name = Column(String)
    brand_id = Column(Integer, ForeignKey("brands.id"))

    model_brand = relationship("Brand", back_populates="brand_model")
    model_type = relationship("Type", back_populates="type_model")
    car_model = relationship("Car", back_populates="model")

class Type(ModelBase):
    __tablename__ = "types"

    name = Column(String)
    model_id = Column(Integer, ForeignKey("models.id"))

    type_model = relationship("Type", back_populates="model_type")
    car_type = relationship("Car", back_populates="type")

class Fuel(ModelBase):
    __tablename__ = "fuels"

    name = Column(String)

    car_fuel = relationship("Car", back_populates="fuel")

class Image(ModelBase):
    __tablename__ = "images"

    url = Column(String)
    car_id = Column(Integer, ForeignKey("cars.id"))

    car_image = relationship("Car", back_populates="image")