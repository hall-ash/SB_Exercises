from flask import Flask, request, render_template, redirect, flash, session, url_for
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

@app.route('/')
def start_survey():
    # session['responses'] = []
    return render_template('start_survey.html', survey=survey)


@app.route('/set', methods=['POST'])
def set_responses():
    # set responses to empty list at survey start
    session['responses'] = []
    return redirect(url_for('question', num=0))


@app.route('/questions/<int:num>')
def question(num):
    '''Renders view for each question. 'num' is the ordinal number of question.'''
    
    responses = session['responses']

     # all questions are answered
    if len(responses) == len(survey.questions):
        return redirect(url_for('completed'))

    elif num == len(responses):
        cur_question = survey.questions[num]
        question = cur_question.question
        choices = cur_question.choices
        return render_template('question.html', q_num=num, question=question, choices=choices)
    
    # redirect if question order is incorrect
    else:
        flash('Questions must be answered in order.')
        return redirect(url_for('question', num=len(responses)))
        

@app.route('/answer', methods=['POST'])
def answer():

    answer = request.form['choice']
    
    # add answer to responses list
    responses = session['responses']
    responses.append(answer)
    session['responses'] = responses

    return redirect(url_for('question', num=len(responses)))


@app.route('/completed')
def completed():
    return render_template('completed.html')