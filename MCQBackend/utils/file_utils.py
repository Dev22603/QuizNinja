import os
import shutil

def isvalidImageFormat(filename: str, valid_formats: set) -> bool:
    """Check if the file has a valid image format."""
    ext = os.path.splitext(filename)[-1].lower()
    return ext in valid_formats


def clearDirectory(directory: str):
    """Remove all files in a directory."""
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path):
            os.remove(file_path)
