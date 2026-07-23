# 🌐 ConnectHub

A full-stack social media web application built using **Django REST Framework** and **React**.

Users can register, log in securely using JWT authentication, create posts with images, like posts, comment, search developers, follow other users, and manage their own profile.

---

## 🚀 Features

- JWT Authentication
- User Registration & Login
- Edit Profile
- Upload Profile Picture
- Create Posts
- Upload Images
- Edit/Delete Posts
- Like & Unlike Posts
- Comments
- Follow/Unfollow Users
- Search Users
- User Profiles
- Responsive UI
- Swagger API Documentation

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React Hot Toast

### Backend

- Django
- Django REST Framework
- PostgreSQL
- Simple JWT
- Pillow
- drf-spectacular

---

## 📸 Screenshots

(Add screenshots after deployment)

---

## ⚙ Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend:

```env
SECRET_KEY=your_secret_key
DEBUG=True

DB_NAME=connecthub_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

---

## 📂 Project Structure

```
ConnectHub/
│
├── backend/
├── frontend/
├── README.md
```

---

## 👩‍💻 Author

**Unnati Singh**

GitHub:
https://github.com/Unnati-singh-ai