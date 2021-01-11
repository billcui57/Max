from app import app, users

@app.shell_context_processor
def make_shell_context():
    return {'users': users}