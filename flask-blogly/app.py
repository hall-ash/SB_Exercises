"""Blogly application."""

from flask import Flask, render_template, redirect, url_for, request
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
# db.create_all()

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
def new_user():
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
        return render_template('new-user-form.html')


@app.route('/users/<int:user_id>')
def user_detail(user_id):
    '''Renders the user detail page'''

    user = User.query.get_or_404(user_id)
    return render_template('user-detail.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['GET', 'POST'])
def edit_user(user_id):
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
def delete_user(user_id):
    '''Deletes the user.'''

    User.query.filter_by(id=user_id).delete()

    db.session.commit()

    return redirect(url_for('list_users'))