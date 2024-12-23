from peewee import *
from database import db

class Models(Model):
    id = AutoField() #id
    username = CharField(max_length=15)  #ユーザーネーム
    keyword = AutoField() #合言葉
    content = TextField() #会話内容

class Meta:
        database = db  # 使用するデータベースを指定

