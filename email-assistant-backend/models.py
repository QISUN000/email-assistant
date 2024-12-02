from enum import Enum
from pydantic import BaseModel
from typing import Optional, List


class EmailRequestModel(BaseModel):
    """Request model for email generation"""

    prompt: str
    tone: str
    response_length: str
    max_tokens: int
    custom_instructions: List[str] = []


class EmailResponseModel(BaseModel):
    """Response model for generated email"""

    email: str
    success: bool
    error: Optional[str] = None
