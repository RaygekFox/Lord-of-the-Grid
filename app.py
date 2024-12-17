import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    # Get the port from the environment variable or default to 5000
    port = int(os.environ.get("PORT", 5000))
    # Run the application on 0.0.0.0 to allow external access
    app.run(host="0.0.0.0", port=port)
