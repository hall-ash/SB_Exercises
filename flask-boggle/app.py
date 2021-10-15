from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify


app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['TESTING'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 60

boggle_game = Boggle()


@app.route('/')
def start_game():
    '''Display 'play' button that starts a new boggle game.'''
    
    return render_template('start_game.html')

@app.route('/play', methods=['GET', 'POST'])
def display_board():
    '''Get and display the new boggle board and save it as a session cookie.'''
    
    board = boggle_game.make_board()
    session['game_board'] = board

    return render_template('display_board.html', board=board)

@app.route('/check/<guess>')
def check_valid_word(guess):
    '''Check whether the user's guess is valid and on the board. '''
    
    board = session['game_board']

    result = boggle_game.check_valid_word(board, guess)

    return jsonify( {'result': result} )


@app.route('/update-high-score', methods=['POST'])
def update_high_score():
    # get final score from request
    score = request.json['score']
   
    # set session cookies for high score and number of games played if not already set
    # otherwise get session cookies and increment values
    curr_high_score = session.get('high_score', 0)
    games_played = session.get('games_played', 0)

    session['games_played'] = games_played + 1
    session['high_score'] = max(curr_high_score, score)


    # send boolean indicating if high score was broken
    brokeRecord = score > curr_high_score
    return jsonify(brokeRecord=brokeRecord)