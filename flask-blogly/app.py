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

    tags = post.tags

    return render_template('post-detail.html', post=post, tags=tags)


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
        checked_tag_ids = request.form.getlist('tag_id')

        # clear previous tags
        PostTag.query.filter_by(post_id=post_id).delete()
     
        # add checked tags to post
        for tag_id in checked_tag_ids:
            tag = Tag.query.get(tag_id)
            post.tags.append(tag)

        db.session.add(post)
        db.session.commit()

        return redirect(url_for('post_detail', post_id=post.id))

    else:
        all_tags = Tag.query.all()

        return render_template('post-edit-form.html', post=post, all_tags=all_tags)


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


@app.route('/tags')
def tag_list():
    '''
    Show list of all tags.
    '''

    all_tags = Tag.query.all()

    return render_template('tag-list.html', all_tags=all_tags)


@app.route('/tags/<int:tag_id>')
def tag_detail(tag_id):
    '''
    Shows tag detail with links to edit or delete the tag.
    '''

    tag = Tag.query.get_or_404(tag_id)

    return render_template('tag-detail.html', tag=tag)


@app.route('/tags/new', methods=['GET', 'POST'])
def tag_create():
    '''
    Shows a form to add a new tag on GET request.
    Processes form, adds tag and redirects to tag list on POST request.
    '''
    if request.method == 'POST':
        # add new tag to db
        tag = Tag(name=request.form['name'])

        db.session.add(tag)
        db.session.commit()

        return redirect(url_for('tag_list'))

    else:
        return render_template('tag-create-form.html')


@app.route('/tags/<int:tag_id>/edit', methods=['GET', 'POST'])
def tag_edit(tag_id):
    '''
    Shows a form to edit a tag on GET request.
    Processes form, edits tag, and redirects to tag list on POST request.
    '''

    # get tag
    tag = Tag.query.get_or_404(tag_id)

    if request.method == 'POST':
        # edit tag's name
        tag.name = request.form['name']

        db.session.add(tag)
        db.session.commit()

        return redirect(url_for('tag_list'))

    else:
        return render_template('tag-edit-form.html', tag=tag)


@app.route('/tags/<int:tag_id>/delete')
def tag_delete(tag_id):
    '''
    Delete a tag and redirect to tag list page.
    '''

    Tag.query.filter_by(id=tag_id).delete()

    db.session.commit()

    return redirect(url_for('tag_list'))