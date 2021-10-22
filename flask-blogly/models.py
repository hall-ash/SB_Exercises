"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    '''User model for Blogly app'''

    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    first_name = db.Column(
        db.String(20),
        nullable=False,
    )

    last_name = db.Column(
        db.String(20),
        nullable=False,
    )

    image_url = db.Column(
        db.VARCHAR(2000)
    )

    posts = db.relationship('Post', backref='creator', cascade="all, delete-orphan")


class Post(db.Model):
    '''Model for user posts in the Blogly app'''

    __tablename__ = 'posts'

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )

    title = db.Column(
        db.String(50),
        nullable=False,
    )

    content = db.Column(
        db.TEXT,
        nullable=False,
    )

    created_at = db.Column(
        db.TIMESTAMP,
        default=datetime.utcnow(),
        nullable=False,
    )

    creator_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='cascade'),
        nullable=False,
    )


##############################################################################
# Helper functions
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


