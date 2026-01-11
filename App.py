from backend.backend import create_app

app = create_app()
host = "0.0.0.0"
port = 5001

if __name__ == "__main__":
    app.run(debug=True, host=host, port=port)

