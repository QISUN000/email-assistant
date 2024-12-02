from anthropic import Anthropic
from models import EmailRequestModel, EmailResponseModel
from config import get_settings


class EmailService:
    """Service for handling email generation using Anthropic's Claude"""

    def __init__(self):
        self._settings = get_settings()
        self._client = Anthropic(api_key=self._settings.ANTHROPIC_API_KEY)

    def _create_prompt(self, request: EmailRequestModel) -> str:
        """Create prompt for email generation"""
        custom_instructions = (
            "\n- ".join(request.custom_instructions)
            if request.custom_instructions
            else "None"
        )

        return f"""You are an expert email writer. Generate a professional email following these exact requirements:
        - do best you can extracting Purpose, Audience, key points and Context from  {request.prompt}
        - Tone: {request.tone}   
        Guidelines:
        1. Start with an appropriate greeting based on the audience and tone
        2. First paragraph should establish context and purpose clearly
        3. Middle paragraphs should cover all key points systematically
        4. End with a clear call to action or next steps
        5. Close with an appropriate signature based on the tone and audience
        6. Keep the email concise and professional
        7. Match the tone exactly as specified
        8. Use appropriate transitions between paragraphs
         Custom Instructions:
        - {custom_instructions}

        Format the email properly with paragraphs and spacing. Return ONLY the email content without explanations or meta-commentary.
        """

    async def generate_email(self, request: EmailRequestModel) -> EmailResponseModel:
        """Generate email based on request parameters"""
        try:
            response = self._client.messages.create(
                model=self._settings.MODEL_NAME,
                messages=[{"role": "user", "content": self._create_prompt(request)}],
                max_tokens=request.max_tokens,
            )

            return EmailResponseModel(email=response.content[0].text, success=True)

        except Exception as e:
            return EmailResponseModel(email="", success=False, error=str(e))
