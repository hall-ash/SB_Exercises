'''Seed file to make sample data for blogly db'''

from models import User, db 
from app import app

# Create tables
db.drop_all()
db.create_all()

# Empty User table
User.query.delete()

# Add users
alan = User(first_name='Alan', last_name='Alda')
joel = User(first_name='Joel', last_name='Burton')
jane = User(first_name='Jane', last_name='Smith')

for user in [alan, joel, jane]:
    db.session.add(user)

db.session.commit()