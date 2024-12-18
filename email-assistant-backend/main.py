from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import EmailRequestModel, EmailResponseModel
from services.email_service import EmailService


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

email_service = EmailService()


@app.post("/generate-email", response_model=EmailResponseModel)
async def generate_email(request: EmailRequestModel):
    try:
        response = await email_service.generate_email(request)
        if not response.success:
            raise HTTPException(status_code=500, detail=response.error)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy"}
