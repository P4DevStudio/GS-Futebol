FROM python:3.12.5

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

COPY . .