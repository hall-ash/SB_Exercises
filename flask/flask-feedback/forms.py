from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.fields.html5 import EmailField
from wtforms.validators import InputRequired, Length, Email


class RegisterUserForm(FlaskForm):
    '''Form to register a user.'''

    username = StringField('username', 
                validators=[InputRequired("username can't be blank"), 
                            Length(max=20, message="username must be 20 characters or less")])
    
    password = PasswordField('password', 
                validators=[InputRequired("password can't be blank")])

    email = EmailField('email',
            validators=[InputRequired("email can't be blank"),
                        Email(message="please enter a valid email address"),
                        Length(max=50, message="email must be 50 characters or less")])
    
    first_name = StringField('first name',
                validators=[InputRequired("first name can't be blank"),
                            Length(max=30, message="first name must be 30 characters or less")])
    
    last_name = StringField('last name',
                validators=[InputRequired("last name can't be blank"),
                            Length(max=30, message="last name must be 30 characters or less")])


class LoginUserForm(FlaskForm):
    '''Form to login a user.'''

    username = StringField('username', 
                validators=[InputRequired("username can't be blank"), 
                            Length(max=20, message="username must be 20 characters or less")])

    password = PasswordField('password', 
                validators=[InputRequired("password can't be blank")])


class FeedbackForm(FlaskForm):
    '''Form to for user feedback.'''

    title = StringField('title', 
            validators=[InputRequired("title can't be blank"),
            Length(max=100, message="title must be 100 characters or less")])

    content = TextAreaField('content',
                validators=[InputRequired("content can't be blank")])


class DeleteForm(FlaskForm):
    '''Delete form'''