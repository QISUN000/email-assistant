from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from dotenv import load_dotenv
from anthropic import Anthropic

# from openai import OpenAI

load_dotenv()
print("After load_dotenv:", os.getenv("ANTHROPIC_API_KEY")[:15])

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class EmailRequest(BaseModel):
    purpose: str
    audience: str
    context: str
    tone: str
    keyPoints: str


@app.post("/generate-email")
async def generate_email(request: EmailRequest):
    try:
        prompt = f"""You are an expert email writer. Generate a professional email following these exact requirements:

        INPUTS:
        - Purpose: {request.purpose}
        - Audience: {request.audience}
        - Context: {request.context}
        - Tone: {request.tone}
        - Key Points: {request.keyPoints}

        Guidelines:
        1. Start with an appropriate greeting based on the audience and tone
        2. First paragraph should establish context and purpose clearly
        3. Middle paragraphs should cover all key points systematically
        4. End with a clear call to action or next steps
        5. Close with an appropriate signature based on the tone and audience
        6. Keep the email concise and professional
        7. Match the tone exactly as specified
        8. Use appropriate transitions between paragraphs

        Format the email properly with paragraphs and spacing. Return ONLY the email content without explanations or meta-commentary.
        """

        print("Before API call:", os.getenv("ANTHROPIC_API_KEY")[:15])

        message = anthropic.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1000,
            messages=[{"role": "user", "content": prompt}],
        )

        print("Response received:", message)
        email_text = message.content[0].text
        return {"email": email_text}

    except Exception as e:
        print("Error details:", str(e))
        raise HTTPException(status_code=500, detail=f"Detailed error: {str(e)}")
