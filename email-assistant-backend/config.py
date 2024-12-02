from pydantic import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    ANTHROPIC_API_KEY: str
    MODEL_NAME: str = "claude-3-opus-20240229"

    SHORT_TOKEN_LIMIT: int = 300
    MEDIUM_TOKEN_LIMIT: int = 500
    LONG_TOKEN_LIMIT: int = 1000

    class Config:
        env_file = ".env"


@lru_cache
def get_settings():
    return Settings()
