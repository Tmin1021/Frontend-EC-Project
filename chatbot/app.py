from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load environment variables from .env file
load_dotenv()

# Check if API key is set
api_key = os.getenv('OPENROUTER_API_KEY_LLMA')
if not api_key:
    print("Error: OPENROUTER_API_KEY_LLMA environment variable not set")
    exit(1)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message')

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            data=json.dumps({
                "model": "meta-llama/llama-3.2-3b-instruct:free",
                "messages": [
                    {
                        "role": "user",
                        "content": user_message
                    }
                ],
            })
        )

        logger.info(f"OpenRouter response: {response.status_code} - {response.text}")
        if response.status_code == 200:
            try:
                data = response.json()
                return jsonify({"response": data['choices'][0]['message']['content']})
            except (KeyError, ValueError) as e:
                return jsonify({"error": f"Error parsing response: {e}"}), 500
        else:
            return jsonify({"error": f"API Error: {response.status_code} - {response.text}"}), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)