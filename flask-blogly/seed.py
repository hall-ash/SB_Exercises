'''Seed file to make sample data for blogly db'''

from models import User, Post, db 
from app import app
from faker import Faker
from random import randint

fake = Faker()

num_users = 5

def populate_users(num_users):
    '''Generates 'num_users' fake users and adds them to the blogly database.'''
    Faker.seed(0)

    for _ in range(num_users):
        user = User(first_name=fake.first_name(), last_name=fake.last_name(), image_url=fake.image_url())
        db.session.add(user)

    db.session.commit()


def populate_posts(num_users, num_posts=20):
    '''
    Generates 'num_posts' fake posts, assigns them to a random 
    creator_id from [1 to num_users] and adds them to the blogly database.
    '''
    Faker.seed(0)

    for _ in range(num_posts):
        post = Post (
            title=fake.sentence(nb_words=4)[:-1].title(), #remove last period and titleize
            content=fake.paragraph(nb_sentences=5),
            created_at=fake.date_time(),
            creator_id=randint(1, num_users)
            )

        db.session.add(post)

    db.session.commit()


# Create tables
db.drop_all()
db.create_all()

# Empty users, posts tables
User.query.delete()
Post.query.delete()

# Add users
populate_users(num_users)

# Add posts
populate_posts(num_users)

