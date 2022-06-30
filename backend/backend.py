from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import re

app = Flask(__name__)
CORS(app)

def check_address(address):
    return bool(re.match("0x[0-9a-fA-F]+",address))


@app.route('/register', methods=['POST'])
def Register():
    data = request.json
    check_addr = check_address(data["address"])

    if (len(data["address"]) > 42) or not(check_addr):
        return ({"status": 400, "error": "Invalid address"}, 400)
    
    conn = sqlite3.connect('store.db')
    cur = conn.cursor()
    query = "insert into users values ('{}', '{}')".format(data["address"], data["agent"])

    try:
        cur.execute(query)
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return ({"status": 400, "error": "Bad Request. Body format not valid"}, 400)
    except sqlite3.Error as err:
        conn.close()
        return ({"status": 500, "error": "Internal Server Error."}, 500)
    
    conn.close()
    return ("Registered!", 200)

@app.route('/user/<address>', methods=['GET'])
def findUser(address):

    if not(check_address(address)):
        return ({"status": 400, "error": "Bad Address"}, 400)

    conn = sqlite3.connect('store.db')
    cur = conn.cursor()
    query = "select agent from users where address like '{}'".format(address)

    try:
        cur.execute(query)
        agent = cur.fetchone()
        if agent is None:
            return ({"status": 404, "error": "Address not found."}, 404)
        else:
            agent = agent[0]
    except sqlite3.Error as err:
        conn.close()
        return ({"status": 500, "error": "Internal Server Error."}, 500)

    conn.close()
    return jsonify({"agent": agent})

if __name__=='__main__':
    app.run(host='127.0.0.1', port=9075)
