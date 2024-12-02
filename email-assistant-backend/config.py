from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    ANTHROPIC_API_KEY: str
    MODEL_NAME: str = "claude-3-opus-20240229"

    class Config:
        env_file = ".env"


@lru_cache
def get_settings():
    return Settings()
