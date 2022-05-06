from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Pet(db.Model):
    '''Pet model for adoption agency.'''

    __tablename__ = 'pets'

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    name = db.Column(
        db.String(30),
        nullable=False
    )

    species = db.Column(
        db.String(20),
        nullable=False
    )

    photo_url = db.Column(
        db.VARCHAR(2000)
    )

    age = db.Column(
        db.Integer
    )

    notes = db.Column(
        db.Text
    )

    available = db.Column(
        db.Boolean,
        nullable=False,
        default=True
    )
    
###########################################
# Helper functions
def connect_db(app):
    '''Connect to database.'''
    db.app = app
    db.init_app(app)