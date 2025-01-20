# 合言葉でマッチングする匿名性を持たせたチャットアプリケーション

このプロジェクトは、**Python, FastAPI, React** を使用したウェブアプリケーションです。  
名前と合言葉を入力してチャットルームに入り、リアルタイムかつ匿名でチャットができるアプリを開発します。

---

## 特徴
- **チャット機能**  
  - 名前と合言葉で特定のチャットルームに参加可能
- **チャット履歴**  
  - 各チャットルームのメッセージ履歴をデータベースに保存
- **使いやすいUI**  
  - CSSで画面を整え、直感的な操作を提供

---

## 使用技術
### フロントエンド
- **React**  
  チャット画面の動的なUIを構築。

### バックエンド
- **FastAPI**  
  APIおよびサーバーサイドのロジックを担当。

### データベース
- **SQLite**（または他のリレーショナルデータベース）  
  メッセージ履歴やユーザー情報を管理。

### WebSocket
- FastAPIのWebSocketを使用し、リアルタイム通信を実現。

---
## 動作条件
- Python3.12以上
- fastapi==0.95.0
- uvicorn==0.22.0
- pydantic==1.10.17
- Node.js(package.jsonを参照)


## 実行環境の構築方法
### backend側の環境構築
```bash
pip install -r ./backend/requirements.txt
pip install -r ./backend/websockets
```  

### frontend側の環境構築
### node.jsがインストールされているか確認
```bash
node -v
```
### インストールされていなかったら
```bash
brew install node
```


### 最新の状態に更新
```bash
brew upgrade node
```

### 環境構築
```bash
cd ./frontend
npm i
npm i react-router-dom
```
---

# 実行手順
## backend側でサーバーの立ち上げ
### 1.backendディレクトリに移動
```bash
cd ./backend 
```
### 2.　サーバ立ち上げ
```bash
uvicorn main:app --reload
```
## react実行(frontend側でサーバ立ち上げ)
### 1.frontendディレクトリに移動
```bash
cd ./frontend 
```
### 2.サーバ立ち上げ
```bash
npm run dev
```

### 立ち上げ後、以下URLにアクセス

http://localhost:5173

---

# その他
## 作業分担
| 作業内容                         | 担当者               |
|----------------------------------|----------------------|
| チームリーダー、指揮官            | **kosita22** |
| 見た目を整える（CSS）            | **k23056** |
| ロジック 中身の実装               | **e-san875**   |
| データベースを作る               | **iida-09**   |
| `main.py` の中身を作る、WebSocketを使う | **KT128-end**   |
| Reactを使う、問題の修正           | **ayumu**   |

---
