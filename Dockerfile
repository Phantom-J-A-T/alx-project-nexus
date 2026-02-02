# 1. Use an official Python runtime as a parent image
FROM python:3.13-slim

# 2. Set environment variables
# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# 3. Set work directory
WORKDIR /app

# 4. Install system dependencies for PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 5. Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy the project
COPY . /app/

# 7. Expose the port Django runs on
EXPOSE 8000

# 8. Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]