from flask import Flask, render_template, redirect, session, flash, url_for
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import RegisterUserForm, LoginUserForm, FeedbackForm, DeleteForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///feedback_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"

connect_db(app)
db.create_all()

toolbar = DebugToolbarExtension(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    '''Display form to register a user and register user on submit.'''

    form = RegisterUserForm()

    # register the user
    if form.validate_on_submit():
        
        user = User.register(username=form.username.data,
                            password=form.password.data,
                            email=form.email.data,
                            first_name=form.first_name.data,
                            last_name=form.last_name.data)

        db.session.add(user)

        try:
            db.session.commit()

        # catch Exception if user tries to register with already existing username
        except IntegrityError:
            form.username.errors.append('Username taken.')
            return render_template('register.html', form=form)

        # keep user logged in
        session['username'] = user.username

        flash('Successfully registered!', 'success')
        return redirect(url_for('user_detail', username=user.username))

    # display the registration form
    else:
        return render_template('register.html', form=form)


@app.route('/users/<username>')
def user_detail(username):
    '''Display the user detail page'''

    # get username from session 
    session_username = session.get('username')

    # not logged in 
    if not session_username:
        flash('You must be logged in.', 'info')
        return redirect(url_for('index'))

    # logged in, not authorized
    elif username != session_username:
        return redirect(url_for('user_detail', username=session_username))

    # logged in and authorized
    else: 
        form = DeleteForm()
        user = User.query.get_or_404(username)
        return render_template('user-detail.html', user=user, form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    '''Display form to login and login authenticated user on submit.'''

    form = LoginUserForm()

    # attempt login on post request
    if form.validate_on_submit():

        # validate user credentials: if valid return user instance, else False
        user = User.authenticate(username=form.username.data,
                                password=form.password.data)

        if user:
            # keep user logged in 
            session['username'] = user.username

            flash(f'Welcome {user.first_name} {user.last_name}!', 'primary')
            return redirect(url_for('user_detail', username=user.username))
        
        else:
            form.username.errors = ['Incorrect login or password.']

    # show login form
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    '''Logout user and redirect to index'''

    # remove user's username from session
    session.pop('username')

    return redirect(url_for('index'))


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    '''Delete the user and redirect to homepage'''

    # get username from session 
    session_username = session.get('username')

    # not logged in  or not authorized
    if not session_username or username != session_username:
        flash('Unauthorized access.', 'danger')
        return redirect(url_for('index'))

    # logged in and authorized
    else: 
        user = User.query.get_or_404(username)

        # delete user from database
        db.session.delete(user)
        db.session.commit()

        # clear username from session
        session.pop('username')

        flash('Your account was successfully deleted.', 'info')
        return redirect(url_for('index'))


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def feedback_form(username):
    '''Display feedback form'''

     # get username from session 
    session_username = session.get('username')

    form = FeedbackForm()

    # logged in and authorized
    if session_username == username:

        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data

            feedback = Feedback(title=title, content=content, username=username)

            db.session.add(feedback)
            db.session.commit()

            return redirect(url_for('user_detail', username=username))

        else:
            return render_template('feedback-form.html', form=form)

    # logged in, not authorized
    elif session_username:
        # redirect to user's own feedback form
        return redirect(url_for('feedback_form'), username=session_username)

    # not logged in 
    else:
        flash('You must be logged in.', 'info')
        return redirect(url_for('index'))


@app.route('/feedback/<int:feedback_id>/update', methods=['GET','POST'])
def edit_feedback(feedback_id):
    '''Display a form to edit feedback'''

     # get username from session 
    session_username = session.get('username')

    # get feedback
    feedback = Feedback.query.get_or_404(feedback_id)

    # user is authorized
    if feedback.username == session_username:

        form = FeedbackForm(obj=feedback)

        if form.validate_on_submit():

            # update feedback data
            feedback.title = form.title.data
            feedback.content = form.content.data

            db.session.commit() # save changes

            return redirect(url_for('user_detail', username=session_username))

        else:
            return render_template('feedback-form.html', form=form, edit=True, feedback=feedback)

    # unauthorized user or not logged in
    else:
        flash('Unauthorized access.', 'danger')
        return redirect(url_for('index'))


@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    '''Delete feedback and redirect to user detail page'''

     # get username from session 
    session_username = session.get('username')

    # get feedback
    feedback = Feedback.query.get_or_404(feedback_id)

    # user is authorized
    if feedback.username == session_username:

        # delete feedback
        db.session.delete(feedback)
        db.session.commit()

        flash('Feedback successfully deleted.', 'info')

        return redirect(url_for('user_detail', username=session_username))

    else:
        flash('Unauthorized access.', 'danger')
        return redirect(url_for('index'))


