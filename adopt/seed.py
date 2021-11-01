'''Seed file to make sample data for pet adoption agency.'''

from models import Pet, db
from app import app
from faker import Faker
from random import choice, randint

fake = Faker()

t_or_f = [True, False]
species = ['dog', 'cat', 'mouse', 'fish', 'hamster', 'iguana']

def populate_pets(num_pets=10):
    '''Generates 'num_pets' fake pets and adds them to the database'''
    Faker.seed(randint(0, 1000))

    for _ in range(num_pets):
        has_photo = choice(t_or_f)
        has_age = choice(t_or_f)
        has_notes = choice(t_or_f)

        photo_url = fake.image_url(width=200, height=200) if has_photo else None
        age = randint(0, 100) if has_age else None
        notes = fake.paragraph(nb_sentences=5) if has_notes else None

        pet = Pet(
            name=fake.name(),
            species=choice(species),
            photo_url=photo_url,
            age=age,
            notes=notes,
            available=choice(t_or_f)
        )

        db.session.add(pet)

    db.session.commit()


# Create tables
db.drop_all()
db.create_all()

# Empty tables
Pet.query.delete()

# Add model instances
populate_pets()