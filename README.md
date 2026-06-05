# 🤖 AI Chatbot Web Application

A simple AI Chatbot built using **Python Flask, HTML, CSS, and JavaScript**. The chatbot is designed to answer questions related to **Artificial Intelligence, Machine Learning, Python Programming, and Data Science** through a clean and interactive web interface.

## 🌐 Live Demo

https://ai-chatbot-wd7y.onrender.com

---

## 🚀 Features

* Interactive chatbot interface
* Answers questions about:

  * Artificial Intelligence (AI)
  * Machine Learning (ML)
  * Python Programming
  * Data Science
* Session-based chat history
* Clear chat functionality
* Responsive user interface
* REST API endpoints for communication
* Deployed online using Render

---

## 🛠️ Technologies Used

* Python
* Flask
* HTML5
* CSS3
* JavaScript
* Render (Deployment)

---

## 📂 Project Structure

```text
AI-Chatbot/
│
├── app.py
├── requirements.txt
├── Procfile
├── runtime.txt
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AI-Chatbot
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

Activate the virtual environment:

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Application

```bash
python app.py
```

Open your browser and visit:

```text
http://127.0.0.1:5000
```

---

## 📡 API Endpoints

### Home Page

```http
GET /
```

Loads the chatbot interface.

### Send Message

```http
POST /send_message
```

Request:

```json
{
  "message": "What is AI?"
}
```

Response:

```json
{
  "success": true,
  "bot_response": "AI (Artificial Intelligence) refers to computer systems designed to perform tasks that typically require human intelligence.",
  "timestamp": "2025-01-01 12:00:00"
}
```

### Get Chat History

```http
GET /get_history
```

### Clear Chat

```http
POST /clear_chat
```

### Health Check

```http
GET /health
```

---

## 🎯 Learning Outcomes

This project demonstrates:

* Flask web development
* Backend API creation
* Session management
* Frontend and backend integration
* JSON handling
* Cloud deployment using Render
* Git and GitHub workflow

---

## 🔮 Future Improvements

* Integration with Gemini API
* Integration with OpenAI API
* User authentication
* Database support
* Chat export functionality
* Voice-based interaction
* Advanced AI responses using Large Language Models (LLMs)

---

## 👨‍💻 Author

**Yuvank Singh**

B.Tech – Artificial Intelligence & Data Science

Government Engineering College Bharatpur

LinkedIn: Yuvank Singh

GitHub: https://github.com/yuvanksingh05

---

## 📜 License

This project is open-source and available for learning and educational purposes.
