# homework3
Group project

You can find our site by this link : https://listenerf-ba120.web.app

### To run our react native app:

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

In a separate instance of the terminal, inside the ra-app directory, do the following

```bash
npm install

npm install -g expo-cli

brew install watchman

npm start
```

npm start will prompt you for the device you would like to .
