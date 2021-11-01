'''Pet adoption agency app'''

from flask import Flask, render_template, redirect, url_for, request, flash
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adopt_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)


@app.errorhandler(404)
def page_not_found(e):
    '''Show 404 page.'''
    return render_template('404.html'), 404

@app.route('/')
def pet_list():
    '''Show list of pets available for adoption'''
    pets = Pet.query.all()

    return render_template('pet_list.html', pets=pets)

@app.route('/add', methods=['POST', 'GET'])
def pet_add():
    '''Add a pet.'''
    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data

        new_pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)
        db.session.add(new_pet)
        db.session.commit()

        flash(f'Added {name} the {species}!')

        return redirect(url_for('pet_list'))

    else:
        return render_template('pet_add_form.html', form=form)

@app.route('/<int:pet_id>', methods=['POST', 'GET'])
def pet_detail(pet_id):
    '''Show pet info with form to edit pet.'''

    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data

        db.session.commit()

        return redirect(url_for('pet_list'))

    else:
        return render_template('pet_detail.html', pet=pet, form=form)


