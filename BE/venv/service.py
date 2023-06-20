from flask import Flask, request,jsonify
import sqlite3
import json
from datetime import datetime,timedelta


def insert_movie(data):
    try:
        conn = sqlite3.connect('movie_database_new.db')  # Connect to the database
        cursor = conn.cursor()
        # Extracting data from the JSON
        title = str(data['Title'])
        release_date = str(data['Release_Date'])
        date = datetime.fromisoformat(release_date[:-1])
        modified_date = date + timedelta(days=1)
        formatted_date = modified_date.strftime('%Y-%m-%d')
        duration = int(data['Duration'])
        genre = str(data['Genre'])
        director = str(data['Director'])
        cast = str(data['Cast'])
        showtime_id = int(data['Showtime_ID'])
        query= "INSERT INTO movie (Title, Release_Date, Duration, Genre, Director, Cast, Showtime_ID) VALUES (?, ?, ?, ?, ?, ?, ?)"
        # SQL query to insert the data into the table
        cursor.execute( query,(title, formatted_date, duration, genre, director, cast, showtime_id))
         # Execute the query
        conn.commit()  # Commit the transaction
        return {"data": data}
    except Exception as e:
        print('Error: ' , e)
        return None

def get_all_movie():
    try:
        conn = sqlite3.connect('movie_database_new.db')  # Connect to the database
        cursor = conn.cursor()

        query = "SELECT * FROM movie"
        cursor.execute(query)

        # Fetch all rows from the result set
        rows = cursor.fetchall()

        # Create a list to store movie data
        movies = []
        for row in rows:
            movie = {
                "ID": row[0],
                "title": row[1],
                "releaseD": row[2],
                "duration": row[3],
                "genre": row[4],
                "director": row[5],
                "cast": row[6],
                "showtime": row[7]
            }
            movies.append(movie)

        conn.close()  # Close the connection

        return jsonify(movies)
    except Exception as e:
        print('error ', e)
def find_movie(Movie_ID):
    try:
        conn = sqlite3.connect('movie_database_new.db')  # Connect to the database
        cursor = conn.cursor()

        query = "SELECT * FROM movie WHERE Movie_ID = ?"
        cursor.execute(query, (Movie_ID,))
        movie = cursor.fetchone()
        conn.close()  # Close the connection
        return movie
    except Exception as e:
        print('error ', e)

def delete_movie(title):
    try:
        conn = sqlite3.connect('movie_database_new.db')  # Connect to the database
        query = "DELETE FROM MOVIE WHERE Title = ?"
        with conn: 
            cursor = conn.cursor()
            cursor.execute(query, (title,))

        conn.commit()  # Commit the transaction
        conn.close()
        return {"movie_title": title}
    except Exception as e:
        print('error ', e)
        return None
def get_all_titles():
    conn = sqlite3.connect('movie_database_new.db')  # Connect to the database
    cursor = conn.cursor()

    query = "SELECT Title FROM movie"
    cursor.execute(query)
    results = cursor.fetchall()  # Fetch all the titles

    conn.close()  # Close the connection

    titles = [result[0] for result in results]  # Extract titles from the results
    return titles

