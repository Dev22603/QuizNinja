# MCQBackend\routers\upload.py

from fastapi import APIRouter, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import List
import shutil
import os
from utils.scan import DocScanner
from utils.file_utils import isvalidImageFormat, clearDirectory
from config import VALID_FORMATS, INPUT_DIR, OUTPUT_DIR
from services.question_extraction import extractQuestion

router = APIRouter(prefix="/upload", tags=["Upload"])

@router.post("")
async def upload_images(files: List[UploadFile]):
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded.")

    # Clear previous files
    clearDirectory(INPUT_DIR)
    clearDirectory(OUTPUT_DIR)

    # Save uploaded files
    for file in files:
        if not isvalidImageFormat(file.filename, VALID_FORMATS):
            raise HTTPException(
                status_code=400, detail=f"Invalid file format: {file.filename}"
            )
        file_path = os.path.join(INPUT_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    # Process images with DocScanner
    for filename in os.listdir(INPUT_DIR):
        input_path = os.path.join(INPUT_DIR, filename)
        scanner = DocScanner(False)
        scanner.scan(input_path, OUTPUT_DIR)

    # Extract MCQs from each original image and aggregate the results
    all_questions = {}
    for filename in os.listdir(INPUT_DIR):
        image_path = os.path.join(INPUT_DIR, filename)
        try:
            mcq_result = extractQuestion(image_path)
            all_questions[filename] = mcq_result["questions"]
        except Exception as e:
            all_questions[filename] = f"Error processing image: {e}"

    return JSONResponse(content=all_questions)
