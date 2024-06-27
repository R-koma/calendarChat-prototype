# ベースイメージとしてPythonを使用
FROM python:3.11-slim

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
COPY app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
COPY app/ .

# ポートを公開
EXPOSE 5001

# アプリケーションを開始
CMD ["python", "app.py"]