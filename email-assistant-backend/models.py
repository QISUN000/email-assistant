from enum import Enum
from pydantic import BaseModel
from typing import Optional


class ToneEnum(str, Enum):
    FRIENDLY = "😊 Friendly"
    FORMAL = "📱 Formal"
    INFORMAL = "😎 Informal"
    FUNNY = "😄 Funny"
    INTERESTED = "🤔 Interested"
    NOT_INTERESTED = "😒 Not Interested"
    EXCITED = "😃 Excited"
    THANKFUL = "🙏 Thankful"
    ANGRY = "😠 Angry"
    SURPRISED = "😮 Surprised"


class ResponseLengthEnum(str, Enum):
    SHORT = "Short"
    MEDIUM = "Medium"
    LONG = "long"


class EmailRequestModel(BaseModel):
    prompt: str
    tone: ToneEnum
    response_length: ResponseLengthEnum


class EmailResponseModel(BaseModel):
    email: str
    success: bool
    error: Optional[str] = None
