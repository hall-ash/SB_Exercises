from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField
from wtforms.fields.html5 import URLField
from wtforms.validators import InputRequired, Optional, URL, NumberRange, AnyOf

# min and max input ages of pet
min_age = 0
max_age = 30

# possible input species
possible_species = ['cat', 'dog', 'porcupine']
species_str = str(possible_species)[1:-1].replace("'", "") # get list of species as str

class AddPetForm(FlaskForm):
    '''Form to add a pet to the database.'''
    name = StringField('Name', 
            validators=[InputRequired(message="Name can't be blank.")])

    species = StringField('Species', validators=[InputRequired(message="Species can't be blank."),
        AnyOf(possible_species, message=f"Species must be one of the following: {species_str}")])

    photo_url = URLField('Photo URL', validators=[Optional(), URL()])

    age = IntegerField('Age', validators=[Optional(), 
        NumberRange(min=min_age, max=max_age, message=f"Age must be between {min_age} and {max_age}.")])

    notes = TextAreaField('Notes', validators=[Optional()])


class EditPetForm(FlaskForm):
    '''Form to edit a pet in the database.'''
    photo_url = URLField('Photo URL', validators=[Optional(), URL()])

    notes = TextAreaField('Notes', validators=[Optional()])

    available = BooleanField('Available')