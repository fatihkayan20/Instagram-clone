import { Injectable, UploadedFiles } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class ImageService {
  async upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    const images: {
      url: string;
    }[] = [];
    files.map(async (file) => {
      // create an unique name for the image with original name
      const name = `${Date.now()}-${file.originalname}`;
      await admin
        .storage()
        .bucket()
        .file('images/' + name)
        .createWriteStream()
        .end(file.buffer);

      const image = {
        url: `https://firebasestorage.googleapis.com/v0/b/instagram-clone-bc58e.appspot.com/o/images%2F${name}?alt=media`,
      };

      images.push(image);
    });

    return images;
  }

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
