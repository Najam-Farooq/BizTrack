from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Replace with your actual DB credentials
# DATABASE_URL = "mysql+pymysql://username:password@localhost/biztrack"
DATABASE_URL = "mysql+pymysql://root:@localhost:3306/biztrack"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
