from database import db
from models import ChatModel

# データベース接続を開く
if db.is_closed():
    db.connect()

# テーブルを作成
db.create_tables([ChatModel])

# データベース接続を閉じる
if not db.is_closed():
    db.close()