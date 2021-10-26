from unittest import TestCase
from app import app
from models import db, User, Post, Tag, PostTag

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

    def test_user_create_submit(self):
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

    def test_user_edit(self):
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

    def test_user_delete(self):
        with app.test_client() as client:

            resp = client.post(f'/users/{self.user_id}/delete', follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn('first_name1', html)

    
class PostViewsTestCase(TestCase):
    '''Test Post views'''

    def setUp(self):
        # clear posts, users tables
        Post.query.delete()
        User.query.delete()

        # create test user
        user = User(first_name="first_name1", last_name="last_name1", image_url=test_image_url)
        
        db.session.add(user)
        db.session.commit()

        # create test post
        post = Post(
            title='Test Title', 
            content='Test post content.',
            creator_id = user.id,
            )

        db.session.add(post)
        db.session.commit()

        self.post_id = post.id
        self.creator_id = post.creator_id

    def tearDown(self):
        db.session.rollback()

    def test_post_create_form(self):
        with app.test_client() as client:
            endpoint = f'/users/{self.creator_id}/posts/new'

            resp = client.get(endpoint)

            html = resp.get_data(as_text=True)

            new_post_form_title = '<h1>Add Post for first_name1 last_name1</h1>'

            self.assertEqual(resp.status_code, 200)
            self.assertIn(new_post_form_title, html)


    def test_post_create_submit(self):
         with app.test_client() as client:
            endpoint = f'/users/{self.creator_id}/posts/new'
            
            new_post = {
                'title': 'New Test Post',
                'content': 'New post content.'
            }

            resp = client.post(endpoint, data=new_post, follow_redirects=True)

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('New Test Post', html)

    def test_post_detail(self):
        with app.test_client() as client:
            resp = client.get(f'/posts/{self.post_id}')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Test post content.', html)

    def test_post_edit_form(self):
        with app.test_client() as client:
            endpoint = f'/posts/{self.post_id}/edit'

            resp = client.get(endpoint)

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Edit Post', html)

    
    def test_post_edit_submit(self):
        with app.test_client() as client:
            endpoint = f'/posts/{self.post_id}/edit'

            edited_post = {
                'title': 'Edited Title',
                'content': 'Test post content.'
            }

            resp = client.post(endpoint, data=edited_post, follow_redirects=True)

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Edited Title', html)

    def test_post_delete(self):
        with app.test_client() as client:
            endpoint = f'/posts/{self.post_id}/delete'

            resp = client.post(endpoint, follow_redirects=True)

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn('Test Title', html)
            

class TagViewsTestCase(TestCase):
    '''Test Tag views'''

    def setUp(self):
        # clear tables
        for table in [Post, User, Tag, PostTag]:
            table.query.delete()

        # create test user
        user = User(first_name="first_name1", last_name="last_name1", image_url=test_image_url)
        
        db.session.add(user)
        db.session.commit()

        # create test post
        post = Post(
            title='Test Title', 
            content='Test post content.',
            creator_id = user.id,
            )

        db.session.add(post)
        db.session.commit()

        # create test tag and add to post
        tag = Tag(name='test_tag')
        post.tags.append(tag)

        db.session.add(post)
        db.session.commit()

        self.tag_id = tag.id

    def tearDown(self):
        db.session.rollback()

    def test_tag_list(self):
        with app.test_client() as client:
            resp = client.get('/tags')

            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)

            tag_list_title = '<h1>Tags</h1>'
            tag_name = 'test_tag'

            for component in [tag_list_title, tag_name]:
                self.assertIn(component, html)
            
    def test_tag_detail(self):
        with app.test_client() as client:
            resp = client.get(f'/tags/{self.tag_id}')

            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)

            post_title = 'Test Title'
            tag_detail_title = '<h1>test_tag</h1>'

            for component in [post_title, tag_detail_title]:
                self.assertIn(component, html)
    
    def test_tag_create_form(self):
        with app.test_client() as client:
            resp = client.get(f'/tags/new')

            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)

            form_title = '<h1>Create a tag</h1>'
            name_input = '<input type="text" name="name" placeholder="Enter a name for the tag">'

            for component in [form_title, name_input]:
                self.assertIn(component, html)

    def test_tag_create_submit(self):
        with app.test_client() as client:
            new_tag = {'name': 'new_tag_name'}

            resp = client.post(f'/tags/new', data=new_tag, follow_redirects=True)

            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)

            tag_list_title = '<h1>Tags</h1>'
            tag_name = 'test_tag'
            new_tag_name = 'new_tag_name'

            for component in [tag_list_title, tag_name, new_tag_name]:
                self.assertIn(component, html)

    def test_tag_edit_form(self):
        with app.test_client() as client:
            resp = client.get(f'/tags/{self.tag_id}/edit')

            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)

            form_title = '<h1>Edit a tag</h1>'
            name_input = '<input type="text" name="name" value="test_tag">'

            for component in [form_title, name_input]:
                self.assertIn(component, html)

    def test_tag_edit_submit(self):
        with app.test_client() as client:
            edited_tag = {'name': 'test tag'}

            resp = client.post(f'/tags/{self.tag_id}/edit', data=edited_tag, follow_redirects=True)

            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)

            tag_list_title = '<h1>Tags</h1>'
            edited_tag_name = 'test tag'

            for component in [tag_list_title, edited_tag_name]:
                self.assertIn(component, html)

    def test_tag_delete(self):
        with app.test_client() as client:
            endpoint = f'/tags/{self.tag_id}/delete'

            # redirects to tag list
            resp = client.post(endpoint, follow_redirects=True)

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn('test_tag', html)