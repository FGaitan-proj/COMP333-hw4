# homework3
Group project

all commands are assuming the current directory is the project directory, unless moved from there.

To recreate the virtual environment to run the backend do the following.

```bash
# Create a Python virtual environment.
python3 -m venv django-react

# Once you have created the virtual environment, to enter it we have to source it.
# For Mac users (remove .fish for a different shell).
source django-react/bin/activate.fish
# For Windows users.
.\django-react\bin\activate

# Install Django in the virtual environment.
pip3 install django
```   

then cd into the existing backend  and enter the following

```bash

pip3 install djangorestframework django-cors-headers

python3 manage.py runserver
```

In a separate instance of the terminal do the following
install: @react-navigation/native, @react-navigation/stack, react, react-native
```bash
npm install -g create-react-app
cd frontend
npm add bootstrap reactstrap
npm install --save react-notifications

npm start
```

npm start will launch the page in your browser.

We implemented the following additional features:
1. keeping track of individual users - a person may login via the input in the user login, but it will not register the password
2. Add React Notificiations - we have notifications implemented for a successful login as well an invalid login
3. Search functionality - we have implemented a search bar that only renders the searched song if it exists 