from flask import Flask, request, send_file,send_from_directory
from flask_cors import CORS
from PIL import Image
from util import ColorizeTheImage
import io
import os
import tempfile

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes 

# works fine below
@app.route('/process-image', methods=['POST'])
def process_image():
    print("Process started")
    file = request.files['image']

    # Save the uploaded file to a temporary file    
    file.save("test_images/inputs/input.jpeg")

    img_out = ColorizeTheImage("test_images/inputs/input.jpeg")

    img_out.save("test_images/ouputs/output.jpg")
    output_image = Image.open("test_images/ouputs/output.jpg")
    
    byte_io = io.BytesIO()  
    output_image.save(byte_io, 'PNG')
    byte_io.seek(0)

    return send_file(byte_io, mimetype='image/png')

@app.route('/inputImage')
def get_input():
    directory_path = 'test_images/inputs'
    return send_from_directory(directory_path, 'input.jpeg', mimetype='image/jpeg')

@app.route('/outputImage')
def get_output():
    directory_path = 'test_images/ouputs'
    return send_from_directory(directory_path, 'output.jpg', mimetype='image/jpeg')



if __name__ == "__main__":
    app.run(debug=True)
