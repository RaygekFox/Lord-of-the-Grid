import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import eventlet
eventlet.monkey_patch()

app = Flask(__name__)
app.config["SECRET_KEY"] = "your_secret_key"
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

# Initial pieces state
pieces = [
    {"id": 1, "type": "King", "x": 4, "y": 4, "color": "blue"},
    {"id": 2, "type": "Warlock", "x": 2, "y": 2, "color": "red"},
]

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("move_piece")
def handle_move_piece(data):
    global pieces
    for piece in pieces:
        if piece["id"] == data["id"]:
            piece["x"] = data["x"]
            piece["y"] = data["y"]
    emit("update_pieces", pieces, broadcast=True)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host="0.0.0.0", port=port)
