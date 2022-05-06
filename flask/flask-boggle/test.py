from unittest import TestCase
from app import app
from flask import session


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_start_game_endpoint(self):
        with app.test_client() as client:
            # make get request 
            resp = client.get('/')
            # get html of rendered page
            html = resp.get_data(as_text=True)

            # test that response status is successful
            self.assertEqual(resp.status_code, 200)

            # test that page components are displayed
            h1_text = '<h1>Hit play to start a new game of boggle!</h1>'
            play_button = '<button type="submit" class="btn btn-primary">Play!</button>'
            
            for component in [h1_text, play_button]:
                self.assertIn(component, html)
            

    def test_play_endpoint_get_req(self):
        with app.test_client() as client:
            # make get request
            resp = client.get('/play')
             # get html of rendered page
            html = resp.get_data(as_text=True)

            # test that response status is successful
            self.assertEqual(resp.status_code, 200)

            # test that page components are displayed
            board_square = '<div class="col letter-square d-flex align-items-center justify-content-center">'
            guess_form = '<form id="guess-form">'
            countdown_timer = '<div>Countdown: <span id="countdown-time">60</span></div>'
            end_game_msg = '<div class="container end-game-container" id="end-game-msg">'

            for component in [board_square, guess_form, countdown_timer, end_game_msg]:
                self.assertIn(component, html)
           
            
            # test that board stored in session cookie is 5 x 5
            board = session['game_board']

            self.assertEqual(len(board), 5)
            for row in board:
                self.assertEqual(len(row), 5)

            # test that element in board is str
            self.assertIsInstance(board[0][0], str)

            
    def test_play_endpoint_post_req(self):
        with app.test_client() as client:
            # make post request
            resp = client.post('/play')
            
            self.assertEqual(resp.status_code, 200)

    
    def test_check_guess_endpoint(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['game_board'] = [['C', 'X', 'N', 'Y', 'I'],
                                           ['O', 'O', 'Y', 'D', 'W'],
                                           ['O', 'R', 'P', 'Z', 'U'],
                                           ['X', 'X', 'K', 'L', 'H'],
                                           ['N', 'R', 'A', 'C', 'V']]
           
            guesses = {
                'car': 'ok', 
                'cart': 'not-on-board', 
                'crt': 'not-word',
                }

            for guess, result in guesses.items():
                resp = client.get(f'/check/{guess}')

                data = resp.get_json()

                self.assertEqual(resp.status_code, 200)
                self.assertEqual(data['result'], result)
            
    
    def test_update_high_score_endpoint(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['high_score'] = 3
                change_session['games_played'] = 1

            scores = {
                1: False,
                5: True,
            }

            for score, brokeRec in scores.items():
                resp = client.post('/update-high-score',
                                    json={'score': score})
                
                data = resp.get_json()

                self.assertEqual(data['brokeRecord'], brokeRec)
           
            self.assertEqual(session['high_score'], 5)
            self.assertEqual(session['games_played'], 3)