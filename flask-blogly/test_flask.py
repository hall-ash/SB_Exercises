from unittest import TestCase
from app import app
from models import db, User

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

test_image_url = "https://images.pexels.com/photos/4587992/pexels-photo-4587992.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"

class UserViewsTestCase(TestCase):
    '''Test User views'''

    def setUp(self):
        '''Add sample User'''

        # clear users table
        User.query.delete()

        # create test user
        user = User(first_name="first_name1", last_name="last_name1", image_url=test_image_url)
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id

    def tearDown(self):
        db.session.rollback()

    def test_list_users(self):
        with app.test_client() as client:
            resp = client.get('/users')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('first_name1', html)

    def test_new_user(self):
        with app.test_client() as client:
            new_user = {
                'first_name': 'first_name2', 
                'last_name': 'last_name2',
                'image_url': ''
                }

            resp = client.post('/users/new', data=new_user, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('first_name2', html)

    def test_user_detail(self):
        with app.test_client() as client:
    
            resp = client.get(f'/users/{self.user_id}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("https://images.pexels.com", html)    

    def test_edit_user(self):
        with app.test_client() as client:
            edited_user = {
                'first_name': 'edited_first_name',
                'last_name': 'last_name1',
                'image_url': test_image_url
            }
            
            resp = client.post(f'/users/{self.user_id}/edit', data=edited_user, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('edited_first_name', html)