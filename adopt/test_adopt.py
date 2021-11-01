from unittest import TestCase
from app import app
from models import db, Pet

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_pet_adopt_db'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

# Disable CSRF token check to allow post requests from test client
app.config['WTF_CSRF_ENABLED'] = False


# pet data used to create sample pet, used for all view funcs except submitting a new pet
test_pet = {
    'name' : 'Testfirst Testlast',
    'species' : 'cat',
    'photo_url' : "https://images.pexels.com/photos/4587992/pexels-photo-4587992.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    'age' : 10,
    'notes' : 'Testfirst Testlast is a cat.',
    }

# pet data used to test submitting a new pet
new_pet = {
    'name' : 'Newfirst Newlast',
    'species' : 'dog',
    'age' : 5,
    'notes' : 'Newfirst Newlast is a dog.',
    }

db.drop_all()
db.create_all()

class PetViewsTestCase(TestCase):
    '''Test Pet views'''


    def setUp(self):
        # clear pets table
        Pet.query.delete()

        # create test pet and add to db
        pet = Pet(**test_pet)
        db.session.add(pet)
        db.session.commit()
        
        self.pet = pet


    def tearDown(self):
        db.session.rollback()

    def test_pet_list(self):
        '''Test that info for pets is displayed in the pet list view.'''
        with app.test_client() as client:
            resp = client.get('/')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)

            # test that the following attrs show up on the pet list page
            for attr in ['name', 'notes']:
                self.assertIn(test_pet[attr], html)

            self.assertIn("https://images.pexels.com", html)    

    def test_pet_add_form(self):
        '''Test that the add pet form is displayed.'''
        with app.test_client() as client:

            resp = client.get('/add')

            html = resp.get_data(as_text=True)

            pet_add_title = '<h1 class="display-2 text-center">Add a pet</h1>'
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn(pet_add_title, html)

    def test_pet_add_submit(self):
        '''Test that a new pet is displayed on the pet list page
        on submission of the add pet form.'''
        with app.test_client() as client:

            resp = client.post('/add', data=new_pet, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)

            # test that the following attrs show up on the pet list page
            for attr in ['name', 'notes']:
                self.assertIn(new_pet[attr], html)
  
    
    def test_pet_detail(self):
        '''Test that pet info is displayed in the pet detail view.'''
        with app.test_client() as client:
    
            resp = client.get(f'/{self.pet.id}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)

            # test that the following attrs show up on the pet detail page
            for attr in ['name', 'age', 'species']:
                self.assertIn(str(test_pet[attr]), html)
            
            self.assertIn("https://images.pexels.com", html)    

    def test_pet_edit_form(self):
        '''Test that the edit pet form is displayed in the pet detail view.'''
        with app.test_client() as client:

            resp = client.get(f'/{self.pet.id}')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn(f"Edit {test_pet['name']}", html)

    def test_pet_edit_submit(self):
        '''
        Test that edited pet info is displayed on the pet list page
        on submission of the edit form.
        '''
        with app.test_client() as client:

            edited_pet = {
                'notes': 'These notes have been edited.',
                'available': False
            }

            resp = client.post(f'/{self.pet.id}', data=edited_pet, follow_redirects=True)

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)

            # test that edited notes show up on pet list page
            self.assertIn(edited_pet['notes'], html)