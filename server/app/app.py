import os

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SECURE'] = True
app.config['JWT_COOKIE_SAMESITE'] = 'Lax'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600

CORS(app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    profile_picture = db.Column(db.String(200))

with app.app_context():
    db.create_all()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Username or email or password is missing!'}), 400

    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify({'message': 'User already exists!'}), 400

    password_hash = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity={'id': new_user.id, 'username': new_user.username, 'email': new_user.email})
    response = make_response(jsonify({'user': {
        'id': new_user.id,
        'username': new_user.username,
        'email': new_user.email,
    }, 'access_token': access_token}))
    response.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='Lax', max_age=3600)

    return response

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Username or password is missing!'}), 400

    user = User.query.filter_by(email=email).first()
    if user is None or not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Invalid credentials!'}), 400

    access_token = create_access_token(identity={'id': user.id, 'username': user.username, 'email': user.email})
    response = make_response(jsonify({'user': {'id': user.id, 'username': user.username, 'email': user.email, 'profile_picture': user.profile_picture}}))
    response.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='Lax', max_age=3600)

    return response

@app.route('/calendar', methods=['GET'])
@jwt_required()
def calendar():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])
    return jsonify({'user': {'id': user.id, 'username': user.username, 'email': user.email, 'profile_picture': user.profile_picture}})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)

