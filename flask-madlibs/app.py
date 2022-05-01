from flask import Flask, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from stories import Story

app = Flask(__name__)

app.debug = True

app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)


stories = {
  0: Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
  ),

  1: Story(
    ['adjective1', 'adjective2', 'holiday', 'noun', 'name'],
    '''
    Roses are {adjective1}, violets are {adjective2}, it’s {holiday} day, and this {noun} is 
    for {name}! 
    '''
  ),

  2: Story(['noun1', 'noun2', 'verb', 'plural_noun', 'adjective'],
  '''
  No need for a {noun1} in a bottle or a crystal ball, let our {noun2} predict your 
  future; {verb}, fold, and amaze your {plural_noun} with your new {adjective} powers.
  '''
  ),
}

cur_story = None

@app.route('/')
def pick_story():
  '''Shows a dropdown of different story templates that a user can choose from.'''
  return render_template('pick_story.html', stories=stories)


@app.route('/form')
def madlibs_form():
  '''
  Shows a form prompting the user to input
  the missing words in the story.
  '''
  story_id = int(request.args['story_id'])
  global cur_story 
  cur_story = stories.get(story_id)
  prompts = cur_story.prompts
  return render_template('madlibs_form.html', prompts=prompts)


@app.route('/story')
def display_story():
  '''
  Displays the story with the user's answers for the
  missing words.
  '''
  answers = {prompt:request.args[prompt] for prompt in cur_story.prompts}
  print(request.form)
  story_text = cur_story.generate(answers)

  return render_template('story.html', story_text=story_text)
