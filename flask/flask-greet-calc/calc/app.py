from flask import Flask, request
import operations as op

app = Flask(__name__)

missing_operands_msg = 'no operands given!'

# dict of math operations
math_ops = {
    'add': op.add, 
    'sub': op.sub,
    'mult': op.mult,
    'div': op.div,
    }


@app.route('/math/<string:operation>')
def do_math(operation):
    '''Do math operations on a and b.'''
    try:
        a = int(request.args['a'])
        b = int(request.args['b'])
        result = math_ops[operation](a, b)
        return f'<h1>{result}</h1>'
    except KeyError:
        return f'<h1>{missing_operands_msg}</h1>'

@app.route('/add')
def add():
    '''Add a and b.'''
    try:
        a = int(request.args['a'])
        b = int(request.args['b'])
        return str(op.add(a, b))
    except KeyError:
        return f'<h1>{missing_operands_msg}</h1>'

@app.route('/sub')
def subtract():
    '''Subtract b from a.'''
    try:
        a = int(request.args['a'])
        b = int(request.args['b'])
        return str(op.sub(a, b))
    except KeyError:
        return f'<h1>{missing_operands_msg}</h1>'

@app.route('/mult')
def multiply():
    '''Multiply a and b.'''
    try:
        a = int(request.args['a'])
        b = int(request.args['b'])
        return str(op.mult(a, b))
    except KeyError:
        return f'<h1>{missing_operands_msg}</h1>'

@app.route('/div')
def divide():
    '''Divide a by b.'''
    try:
        a = int(request.args['a'])
        b = int(request.args['b'])
        return str(op.div(a, b))
    except KeyError:
        return f'<h1>{missing_operands_msg}</h1>'

@app.route('/subtract')
def redirect_sub():
    '''Redirects to '/sub' from '/subtract'.'''
    return '''
    <h1>Did you mean <a href='/sub'>/sub</a>?</h1>
    '''

@app.route('/multiply')
def redirect_mult():
    '''Redirects to '/mult' from '/multiply'.'''
    return '''
    <h1>Did you mean <a href='/mult'>/sub</a>?</h1>
    '''

@app.route('/divide')
def redirect_div():
    '''Redirects to '/div' from '/divide'.'''
    return '''
    <h1>Did you mean <a href='/div'>/sub</a>?</h1>
    '''