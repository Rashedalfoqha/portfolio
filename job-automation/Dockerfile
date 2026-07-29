FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    TZ=Asia/Amman

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates fonts-dejavu-core tzdata \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY config ./config
COPY data ./data
COPY src ./src

RUN mkdir -p state output logs \
    && useradd --create-home --uid 10001 scout \
    && chown -R scout:scout /app

USER scout

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8080/healthz', timeout=3)"

CMD ["uvicorn", "src.service:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "1"]
