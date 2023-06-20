from flask import Flask, request
import sqlite3
import json
import flask
from flask import request, jsonify, Response,redirect,url_for
import json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import pandas as pd
import sqlite3
import constant as constant
import service as service
app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


@app.route('/movies', methods=['POST'])
def add_movie():
    data = request.get_json()  # Get the JSON data from the request
    res_data = service.insert_movie(data)  # Call the insert_movie function with the JSON data
    # Return response
    response = Response(json.dumps(res_data), mimetype='application/json')
    return response
@app.route('/movies', methods=['GET'])
def movies():
    movies_data = service.get_all_movie() # Call the get_all_movies function
    return movies_data
@app.route('/movies/<string:title>', methods=['DELETE'])
def delete_movie(title):
    service.delete_movie(title)  # Call the delete_movie function
    return jsonify({'message': 'Movie deleted successfully'})
@app.route('/movies/<int:movie_id>', methods = ['GET'] )
def find_movie(movie_id):
    movie_data = service.find_movie(movie_id)
    if movie_data:
        # Convert the movie details to a JSON response
        response = {
            'ID': movie_data[0],
            'Title': movie_data[1],
            'Release_Date': movie_data[2],
            'Duration': movie_data[3],
            'Genre': movie_data[4],
            'Director': movie_data[5],
            'Cast': movie_data[6],
            'Showtime_ID': movie_data[7]
        }
        return jsonify(response)
    else:
        return jsonify({'message': 'Movie not found'})
@app.route('/movies/all_title', methods=['GET'])
def get_all_movie_titles():
    titles = service.get_all_titles()  # Call the get_all_titles function
    return jsonify({'titles': titles})
@app.route('/register', methods=['POST'])
def register():
    # Get the registration data from the request
    data = request.get_json()
    print(data)
    # Extract the information from the data
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    phone = data.get('phone')
    fullname = data.get('fullname')
    # Validate the data (you can add more validation logic as per your requirements)
    if not (username and password and email and phone and fullname):
        return jsonify({'success': False, 'message': 'All fields are required'})

    # Insert the data into the database
    conn = sqlite3.connect('movie_database_new.db')  # Replace with your database name
    cursor = conn.cursor()
    query = 'SELECT * FROM customer WHERE username = ?'
    cursor.execute(query, (username,))
    existing_user = cursor.fetchone()
    if existing_user:
        return jsonify({'success': False, 'message': 'Username already exists'})
    query = 'INSERT INTO customer (username, password, email, phone_number,Customer_Name) VALUES (?, ?, ?, ?, ?)'
    try:
        cursor.execute(query,(username, password, email, phone,fullname,))
        conn.commit()
        return jsonify({'success': True, 'message': 'Registration successful'})
    except sqlite3.Error as e:
        print('Error occurred during registration:', str(e))
        return jsonify({'success': False, 'message': 'Registration failed'})

    conn.close()
@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    conn = sqlite3.connect('movie_database_new.db')  # Replace with your database name
    cursor = conn.cursor()
    query = 'SELECT COUNT(*) FROM customer WHERE username=? AND password=?'
    cursor.execute(query, (username, password))
    result = cursor.fetchone()
    count = result[0]
    
    if count > 0:
        response = {
            'message': 'Login successful',
            'success': True
        }
        return jsonify(response), 200
    else:
        response = {
            'message': 'Invalid username or password',
            'success': False
        }
        return jsonify(response), 401
    return jsonify(response)
if __name__ == '__main__':
    app.run(debug=True)