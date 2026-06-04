# 🤖 AI Chatbot - A Python Flask Web Application

A modern, beginner-friendly AI Chatbot web application built with Python Flask, HTML, CSS, and JavaScript. Perfect for learning web development and AI integration basics!

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [API Endpoints](#api-endpoints)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Modern Chat Interface**: Clean and intuitive UI with real-time message display
- **Session Management**: Chat history is preserved during the session
- **Clear Chat Feature**: Easily clear all messages with one click
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional Code Structure**: Well-organized folders and detailed comments
- **Rule-Based Chatbot**: Simple chatbot that responds to common queries
- **Loading Indicators**: Visual feedback while waiting for responses
- **Error Handling**: Comprehensive error messages and validation
- **Time Stamps**: Every message is timestamped for reference

## 📁 Project Structure

```
ai-chatbot/
│
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── README.md                       # This file
│
├── static/                         # Static files folder
│   ├── css/
│   │   └── style.css              # Styling for the chat interface
│   └── js/
│       └── script.js              # Frontend JavaScript logic
│
└── templates/                      # HTML templates folder
    └── index.html                 # Main chatbot interface
```

## 🔧 Requirements

- **Python 3.8+**: The programming language
- **Flask 2.3.2+**: Web framework for the backend
- **Modern Web Browser**: To access the chat interface
- **Basic Internet Connection**: For local development

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yuvanksingh05/ai-chatbot.git
cd ai-chatbot
```

### Step 2: Create a Virtual Environment (Recommended)

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Run the Application

```bash
python app.py
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### Step 5: Access the Chatbot

Open your web browser and navigate to:
```
http://localhost:5000
```

That's it! Your chatbot is now running locally! 🎉

## 💬 Usage

1. **Type a Message**: Enter your question or message in the input field
2. **Send Message**: Press Enter or click the "Send" button
3. **View Response**: The chatbot responds in real-time
4. **Clear Chat**: Click the "🗑️ Clear Chat" button to reset the conversation
5. **Chat History**: Your messages are saved during the session

### Example Queries to Try:

- "Hello"
- "What is AI?"
- "Tell me about Machine Learning"
- "What is Python?"
- "Help"
- "Goodbye"

## 🧠 How It Works

### Architecture Overview

```
┌─────────────────────────────────────────┐
│         Web Browser (Frontend)           │
│  ┌──────────────────────────────────┐   │
│  │  HTML/CSS for UI & JavaScript    │   │
│  │  - Displays messages             │   │
│  │  - Handles user input            │   │
│  │  - Manages local chat display    │   │
│  └──────────────────────────────────┘   │
└────────────────────┬────────────────────┘
                     │ HTTP Requests
                     ▼
┌─────────────────────────────────────────┐
│    Flask Backend Server (app.py)        │
│  ┌──────────────────────────────────┐   │
│  │  Routes & Request Handlers       │   │
│  │  - /send_message                 │   │
│  │  - /get_history                  │   │
│  │  - /clear_chat                   │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │  Chatbot Logic                   │   │
│  │  - Process user input            │   │
│  │  - Generate responses            │   │
│  │  - Manage chat history           │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │  Session Management              │   │
│  │  - Store chat history            │   │
│  │  - User session data             │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Message Flow

1. **User Types Message** → JavaScript captures input
2. **Send Request** → Frontend sends JSON to `/send_message` endpoint
3. **Backend Processing** → Flask receives, validates, and processes message
4. **Generate Response** → Chatbot logic generates appropriate response
5. **Store History** → Message and response stored in session
6. **Return Response** → Backend sends JSON response to frontend
7. **Display Message** → JavaScript displays message in chat interface
8. **Update UI** → Chat container updates with new messages

## 🔌 API Endpoints

### 1. Send Message Endpoint
- **URL**: `/send_message`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "message": "user message here"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "bot_response": "response text",
    "timestamp": "12:34"
  }
  ```

### 2. Get Chat History
- **URL**: `/get_history`
- **Method**: GET
- **Response**:
  ```json
  {
    "success": true,
    "history": [
      {
        "type": "user",
        "content": "hello",
        "timestamp": "12:30"
      },
      {
        "type": "bot",
        "content": "Hi there!",
        "timestamp": "12:30"
      }
    ]
  }
  ```

### 3. Clear Chat
- **URL**: `/clear_chat`
- **Method**: POST
- **Response**:
  ```json
  {
    "success": true,
    "message": "Chat history cleared successfully"
  }
  ```

### 4. Health Check
- **URL**: `/health`
- **Method**: GET
- **Response**:
  ```json
  {
    "status": "healthy",
    "message": "AI Chatbot server is running"
  }
  ```

## 🎨 Customization

### Add New Bot Responses

Edit the `generate_chatbot_response()` function in `app.py`:

```python
responses = {
    'your_keyword': 'Your response here',
    'another_keyword': 'Another response here',
}
```

### Change UI Colors

Modify the color variables in `static/css/style.css`:

```css
/* Change primary color */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add New Features

Common enhancements:

1. **Database Integration**: Store messages permanently
2. **User Authentication**: Add login/signup
3. **AI API Integration**: Connect to OpenAI, Hugging Face API
4. **File Upload**: Allow document uploads
5. **Message Search**: Search through chat history
6. **Export Chat**: Download conversations as PDF or text

## ❓ Troubleshooting

### Issue: Port 5000 already in use

**Solution**: Change the port in `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Use different port
```

### Issue: "Module not found" error

**Solution**: Ensure virtual environment is activated and dependencies installed:
```bash
pip install -r requirements.txt
```

### Issue: CSS/JS not loading

**Solution**: Clear browser cache (Ctrl+Shift+Delete on most browsers) and refresh

### Issue: Messages not sending

**Solution**: 
1. Check browser console for errors (F12)
2. Verify Flask server is running
3. Check network tab to see API requests

### Issue: Chat history not persisting after refresh

**This is by design**: Chat history is session-based and clears on refresh. To persist permanently, integrate a database like SQLite or MongoDB.

## 🚀 Future Enhancements

Here are some features you can add to level up your project:

### Phase 2 - Intermediate:
- [ ] Add SQLite database for persistent chat history
- [ ] User authentication with login/signup
- [ ] Message search and filtering
- [ ] Export chat to PDF/TXT
- [ ] Add emoji picker
- [ ] Better message formatting with markdown support

### Phase 3 - Advanced:
- [ ] Integrate OpenAI API for GPT responses
- [ ] Add sentiment analysis
- [ ] Multi-language support
- [ ] Voice input/output with speech recognition
- [ ] Integration with Hugging Face models
- [ ] Real-time collaboration features
- [ ] Deploy to cloud (Heroku, AWS, Google Cloud)

## 📖 Learning Resources

- **Flask Documentation**: https://flask.palletsprojects.com/
- **Python Official Docs**: https://docs.python.org/3/
- **JavaScript MDN Web Docs**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **HTML5 Tutorial**: https://www.w3schools.com/html/
- **CSS Guide**: https://www.w3schools.com/css/

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 Code Comments Guide

The code includes extensive comments explaining:
- **What**: What each section does
- **Why**: Why we use certain approaches
- **How**: How to use or modify the code

Take time to read the comments to better understand the project!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by: **Yuvan Singh** (@yuvanksingh05)

This project is designed for **beginner AI & Data Science students** to learn:
- Web development with Python and Flask
- Frontend development with HTML, CSS, and JavaScript
- API design and backend logic
- Session management and data handling
- Professional code organization

## 🙏 Acknowledgments

- Flask community for the amazing web framework
- All contributors and users
- Built with ❤️ for learning

## 📞 Support

If you encounter any issues:
1. Check the **Troubleshooting** section
2. Review the **code comments** for guidance
3. Check the **GitHub Issues** page
4. Feel free to ask in discussions

---