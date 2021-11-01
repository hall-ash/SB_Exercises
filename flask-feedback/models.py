from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()

bcrypt = Bcrypt()

def connect_db(app):
    '''Connect to database.'''
  
    db.app = app
    db.init_app(app)


class User(db.Model):
    '''Site user.'''

    __tablename__ = 'users'

    username = db.Column(db.String(20), primary_key=True)

    password = db.Column(db.Text, nullable=False)

    email = db.Column(db.String(50), nullable=False, unique=True)

    first_name = db.Column(db.String(30), nullable=False)

    last_name = db.Column(db.String(30), nullable=False)

    feedbacks = db.relationship('Feedback', backref='user', cascade="all, delete-orphan")

    @classmethod
    def register(cls, username, password, email, first_name, last_name):
        '''Register user with hashed password and return user.'''

        #hash the password
        hashed = bcrypt.generate_password_hash(password)

        # turn bytestring into normal (unicode utf8) string
        hashed_utf8 = hashed.decode("utf8")

        #return user instance
        return cls(username=username,
                    password=hashed_utf8,
                    email=email,
                    first_name=first_name,
                    last_name=last_name)

    @classmethod
    def authenticate(cls, username, password):
        '''
        Validate that user exists and password is correct.
        Return user if valid, else return False.
        '''
        # get user with given username
        valid_user = User.query.filter_by(username=username).one_or_none()

        # if user exists compare given password with user's stored hashed password 
        if valid_user and bcrypt.check_password_hash(valid_user.password, password):
            return valid_user
        else:
            return False

    
class Feedback(db.Model):
    '''User feedback'''

    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    title = db.Column(db.String(100), nullable=False)

    content = db.Column(db.Text, nullable=False)

    username = db.Column(db.String(20), db.ForeignKey('users.username', ondelete='cascade'), nullable=False)

