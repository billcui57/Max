from app import app, tamagotchiCollection

@app.shell_context_processor
def make_shell_context():
    return {'tamagotchiCollection': tamagotchiCollection}