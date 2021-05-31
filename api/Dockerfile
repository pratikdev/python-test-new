FROM python:3.7.6

RUN mkdir /db
WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY . .

# Run migrations and load seed data (using SQLite)
RUN python manage.py migrate
RUN python manage.py loaddata portal/fixtures/seed.yaml
RUN python manage.py loaddata scheduler/fixtures/seed.yaml

EXPOSE 8000
VOLUME /db
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
