FROM python:latest

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

# RUN python create_data.py

CMD ["fastapi", "run", "main.py", "--port", "8000"]