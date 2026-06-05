"""
AI Chatbot Application - Flask Backend
This is the main application file that handles:
- Flask server setup and configuration
- Chat message processing
- Session management
- Chat history storage
"""

from flask import Flask, render_template, request, jsonify, session
from datetime import datetime
import os

# Initialize Flask application
app = Flask(__name__)

# Configure secret key for session management
# In production, use environment variables for security
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')

# Configure session to use filesystem
app.config['SESSION_TYPE'] = 'filesystem'


def generate_chatbot_response(user_message):
    """
    Generate a response from the chatbot based on user input.
    This is a simple rule-based chatbot for demonstration purposes.
    For advanced AI, you can integrate with APIs like OpenAI or Hugging Face.
    
    Args:
        user_message (str): The user's input message
        
    Returns:
        str: The chatbot's response message
    """
    
    # Convert message to lowercase for case-insensitive matching
    message_lower = user_message.lower().strip()
    
    # Define predefined responses for common queries
    responses = {
        'hello': 'Hello! 👋 Welcome to the AI Chatbot. How can I assist you today?',
        'hi': 'Hi there! 👋 What can I help you with?',
        'how are you': 'I\'m doing great, thank you for asking! 😊 How can I help you?',
        if 'ai' in message_lower or 'artificial intelligence' in message_lower:
    return 'AI (Artificial Intelligence) refers to computer systems designed to perform tasks that typically require human intelligence.'

elif 'machine learning' in message_lower:
    return 'Machine Learning is a subset of AI that enables systems to learn from data.'

elif 'python' in message_lower:
    return 'Python is a versatile programming language used in AI, web development, and data science.'
        'help': 'I can help you with questions about AI, Machine Learning, Python, and more! Try asking me about:\n- AI and Machine Learning\n- Python Programming\n- Data Science\n- General questions',
        'bye': 'Goodbye! 👋 It was great chatting with you. Feel free to come back anytime!',
        'goodbye': 'See you later! 👋 Have a wonderful day!',
        'thank you': 'You\'re welcome! 😊 Is there anything else I can help you with?',
        'thanks': 'Happy to help! 😊 Any other questions?',
    }
    
    # Check for exact matches first
    if message_lower in responses:
        return responses[message_lower]
    
    # Check for partial matches
    for key, response in responses.items():
        if key in message_lower:
            return response
    
    # Default response if no match is found
    return (
        'That\'s an interesting question! 🤔 While I don\'t have a specific response for that yet, '
        'I\'m continuously learning. Try asking me about AI, Machine Learning, Python, or Data Science!'
    )


@app.route('/')
def index():
    """
    Render the main chatbot interface.
    This serves the index.html template.
    """
    return render_template('index.html')


@app.route('/send_message', methods=['POST'])
def send_message():
    """
    Handle incoming chat messages from the frontend.
    This endpoint:
    1. Receives the user's message
    2. Generates a chatbot response
    3. Stores both messages in session history
    4. Returns the response as JSON
    
    Expected JSON payload:
    {
        "message": "user message here"
    }
    
    Returns:
        JSON object with:
        - success: boolean indicating operation success
        - bot_response: the chatbot's reply
        - timestamp: when the message was processed
    """
    
    try:
        # Get user message from request
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        # Validate message is not empty
        if not user_message:
            return jsonify({
                'success': False,
                'error': 'Message cannot be empty'
            }), 400
        
        # Initialize chat history in session if it doesn't exist
        if 'chat_history' not in session:
            session['chat_history'] = []
        
        # Generate bot response
        bot_response = generate_chatbot_response(user_message)
        
        # Create message objects with timestamps
        user_msg_obj = {
            'type': 'user',
            'content': user_message,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        bot_msg_obj = {
            'type': 'bot',
            'content': bot_response,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        # Add messages to chat history
        session['chat_history'].append(user_msg_obj)
        session['chat_history'].append(bot_msg_obj)
        
        # Mark session as modified to ensure it's saved
        session.modified = True
        
        return jsonify({
            'success': True,
            'bot_response': bot_response,
            'timestamp': bot_msg_obj['timestamp']
        }), 200
        
    except Exception as e:
        # Log error and return error response
        print(f'Error processing message: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'An error occurred processing your message'
        }), 500


@app.route('/get_history', methods=['GET'])
def get_history():
    """
    Retrieve the complete chat history for the current session.
    This is useful for page reloads or history review.
    
    Returns:
        JSON object with:
        - success: boolean indicating operation success
        - history: array of message objects from chat history
    """
    
    # Get chat history from session, default to empty list if not exists
    chat_history = session.get('chat_history', [])
    
    return jsonify({
        'success': True,
        'history': chat_history
    }), 200


@app.route('/clear_chat', methods=['POST'])
def clear_chat():
    """
    Clear the chat history for the current session.
    This endpoint resets all messages.
    
    Returns:
        JSON object with:
        - success: boolean indicating operation success
        - message: confirmation message
    """
    
    try:
        # Clear chat history from session
        session['chat_history'] = []
        session.modified = True
        
        return jsonify({
            'success': True,
            'message': 'Chat history cleared successfully'
        }), 200
        
    except Exception as e:
        print(f'Error clearing chat: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'An error occurred clearing the chat'
        }), 500


@app.route('/health', methods=['GET'])
def health():
    """
    Health check endpoint to verify the server is running.
    Useful for monitoring and debugging.
    
    Returns:
        JSON object with status information
    """
    return jsonify({
        'status': 'healthy',
        'message': 'AI Chatbot server is running'
    }), 200


# Error handlers for better error management
@app.errorhandler(404)
def not_found(error):
    """Handle 404 Not Found errors."""
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 Internal Server errors."""
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500


if __name__ == '__main__':
    """
    Entry point for the Flask application.
    
    Development settings:
    - debug=True: Enables auto-reload and detailed error pages
    - host='0.0.0.0': Accessible from any IP address
    - port=5000: Default Flask port
    
    Note: Change debug=False for production deployment
    """
    app.run(debug=True, host='0.0.0.0', port=5000)
