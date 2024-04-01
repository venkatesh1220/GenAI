import torch

from deoldify import device
from deoldify.device_id import DeviceId
from deoldify.visualize import *

torch.backends.cudnn.benchmark = True


def ColorizeTheImage(source):
    device.set(device=DeviceId.CPU)
    colorizer = get_image_colorizer(artistic=True)
    img_out = colorizer.get_transformed_image(path=source,
                                              render_factor=15,
                                              watermarked=False)
    

    print(type(img_out))
    print(img_out)
    img_out.save("test_images/ouputs/output.jpg")
    print("Done")
    return img_out


# ColorizeTheImage("test_images/inputs/input.jpeg")
