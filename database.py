from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


db_url = "postgresql://admin:1406Anil%40@localhost:5432/fastapidb"
engine = create_engine(db_url)
session_local = sessionmaker(autoflush=False, bind=engine)