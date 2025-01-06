# 指定したkeywordが一致するデータを取得する関数
def get_chat_by_keyword(name,keyword):
    record, created = ChatModel.get_or_create(
        keyword=keyword,
        defaults={"username":name,"content":"initial chat"},
    )
    if created:
        print("新しい部屋を作成")
        return [record]
    else:
        print("既存のkeyword")
    # keywordが一致するデータを取得し、idで昇順に並べる
    chats = ChatModel.select().where(ChatModel.keyword == keyword).order_by(ChatModel.id.asc())
    return list(chats)