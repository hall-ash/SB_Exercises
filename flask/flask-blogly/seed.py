'''Seed file to make sample data for blogly db'''

from models import User, Post, Tag, PostTag, db 
from app import app
from faker import Faker
from random import randint

fake = Faker()

def populate_users(num_users):
    '''Generates 'num_users' fake users and adds them to the blogly database.'''
    Faker.seed(randint(0, 1000))

    for _ in range(num_users):
        user = User(first_name=fake.first_name(), last_name=fake.last_name(), image_url=fake.image_url(width=200, height=200))
        db.session.add(user)

    db.session.commit()


def populate_posts(num_users, posts_per_user=5):
    '''
    Generates 'num_posts' fake posts, assigns them to a random 
    creator_id from [1 to num_users] and adds them to the blogly database.
    '''
    Faker.seed(randint(0, 1000))

    num_posts = num_users * posts_per_user

    for _ in range(num_posts):
        post = Post (
            title=fake.sentence(nb_words=4)[:-1].title(), #remove last period and titleize
            content=fake.paragraph(nb_sentences=5),
            created_at=fake.date_time(),
            creator_id=randint(1, num_users)
            )

        db.session.add(post)

    db.session.commit()


def populate_tags(num_tags=10):
    '''
    Generates 'num_tags' fake tags of random color names.
    '''
    Faker.seed(randint(0, 1000))

    # get set of unique colors
    colors = set()
    while len(colors) < num_tags:
        colors.add(fake.color_name())

    # make tags
    for color in colors:
        tag = Tag(name=color)
        db.session.add(tag)

    db.session.commit()


def populate_blog(num_users):
    populate_users(num_users)
    populate_posts(num_users)
    populate_tags()


# Create tables
db.drop_all()
db.create_all()

# Empty tables
for table in [User, Post, Tag, PostTag]:
    table.query.delete()

# Add model instances
num_users = 5
populate_blog(num_users)

