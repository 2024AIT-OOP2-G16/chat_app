from peewee import *
from database import db

class ChatModel(Model):
    id = AutoField() #id
    username = CharField(max_length=15)  #ユーザーネーム
    room_id = CharField(max_length=30) #合言葉
    content = TextField() #会話内容

    class Meta:
        database = db  # 使用するデータベースを指定

# 指定したroom_idが一致するデータを取得する関数
def get_chat_by_room_id(name,room_id):
    record, created = ChatModel.get_or_create(
        room_id=room_id,
        defaults={"username":name,"content":"Initial Chat"},
    )
    if created:
        print("新しい部屋を作成")
        return [record]
    else:
        print("既存のroom_id")
    # room_idが一致するデータを取得し、idで昇順に並べる
    chats = ChatModel.select().where(ChatModel.room_id == room_id).order_by(ChatModel.id.asc())
    return list(chats)

#新たなチャットを保存する機能。
def save_new_chat(username, room_id, content):
    """
    新しいチャットメッセージを保存する関数。

    Args:
        username (str): ユーザーネーム。
        room_id (str): 部屋の識別子。
        content (str): チャットメッセージ。

    Returns:
        ChatModel: 保存されたチャットオブジェクト。
    """
    try:
        new_chat = ChatModel.create(
            username=username,
            room_id=room_id,
            content=content
        )
        print(f"新しいチャットが保存されました: {new_chat.id}")
        return new_chat
    except Exception as e:
        print(f"チャットの保存中にエラーが発生しました: {e}")
        raise
if __name__=="__main__":
 testdata=save_new_chat("hanako,","aaa","サンプル")
 print(testdata)
