"""Blogly application."""

from flask import Flask, render_template, redirect, url_for, request
from models import db, connect_db, User, Post, Tag, PostTag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

@app.route('/')
def index():
    return redirect(url_for('list_users'))

@app.route('/users')
def list_users():
    '''Render bulletted list of users.'''

    users = User.query.all()
    print(users)

    return render_template('users.html', users=users)

@app.route('/users/new', methods=['GET', 'POST'])
def user_create():
    '''Create a new user.'''

    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        image_url = request.form['image_url']

        new_user = User(
            first_name=first_name,
            last_name=last_name,
            image_url=image_url 
        )

        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('list_users'))
    else:
        return render_template('user-create-form.html')


@app.route('/users/<int:user_id>')
def user_detail(user_id):
    '''Renders the user detail page'''

    user = User.query.get_or_404(user_id)

    return render_template('user-detail.html', user=user, posts=user.posts)

@app.route('/users/<int:user_id>/edit', methods=['GET', 'POST'])
def user_edit(user_id):
    '''Edit user info.'''

    user = User.query.get_or_404(user_id)

    if request.method == 'POST':
    
        user.first_name = request.form['first_name']
        user.last_name = request.form['last_name']
        user.image_url = request.form['image_url']

        db.session.add(user)
        db.session.commit()

        return redirect(url_for('user_detail', user_id=user.id))
    else: 
        return render_template('user-edit-form.html', user=user)

    
@app.route('/users/<int:user_id>/delete')
def user_delete(user_id):
    '''Deletes the user.'''

    User.query.filter_by(id=user_id).delete()

    db.session.commit()

    return redirect(url_for('list_users'))


@app.route('/users/<int:user_id>/posts/new', methods=['GET', 'POST'])
def post_create(user_id):
    '''
    Show form to add a post for that user on GET request.
    Handle add form; add post and redirect to the user detail page on POST request.
    '''
    
    if request.method == 'POST':

        title = request.form['title']
        content = request.form['content']

        new_post = Post(title=title, content=content, creator_id=user_id)

        db.session.add(new_post)
        db.session.commit()

        return redirect(url_for('user_detail', user_id=user_id))
    
    else:

        user = User.query.get_or_404(user_id)
        return render_template('post-create-form.html', user=user)
        

@app.route('/posts/<int:post_id>')
def post_detail(post_id):
    '''
    Show a post, and buttons to edit and delete the post.
    '''
    post = Post.query.get_or_404(post_id)

    return render_template('post-detail.html', post=post)


@app.route('/posts/<int:post_id>/edit', methods=['GET', 'POST'])
def post_edit(post_id):
    '''
    Show form to edit a post, and to cancel (back to user page) on GET request.
    Handle editing of a post, and redirect back to the post view on POST request.
    '''

    post = Post.query.get_or_404(post_id)

    if request.method == 'POST':
        post.title = request.form['title']
        post.content = request.form['content']

        db.session.add(post)
        db.session.commit()

        return redirect(url_for('post_detail', post_id=post.id))

    else:
        return render_template('post-edit-form.html', post=post)


@app.route('/posts/<int:post_id>/delete')
def post_delete(post_id):
    '''
    Delete the post.
    '''
    query = Post.query.filter_by(id=post_id)

    # get post instance to access creator_id
    post = query.one()
    creator_id = post.creator_id

    # delete post
    query.delete()

    db.session.commit()

    return redirect(url_for('user_detail', user_id=creator_id))