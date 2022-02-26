import { createWriteStream, unlinkSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';


export const uploadProfilePicture = (
  oldPictureName: string,
  createReadStream: any,
): Promise<string> => {
  const filename = `${uuidv4()}`;
  return new Promise(async (resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(`public/${filename}.jpeg`))
      .on('finish', () => {
        if (oldPictureName) {
          try {
            unlinkSync(`public/${oldPictureName}.jpeg`);
          } catch (err) {}
        }
        return resolve(filename);
      })
      .on('error', () => null),
  );
};

export const unlinkPicture = (filename: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      unlinkSync(`public/${filename}.jpeg`);
      resolve(true);
    } catch (err) {
      reject(false);
    }
  });
};

export const uploadAcceptedCandidatePicture = (
  oldPictureName: string,
  createReadStream: any,
): Promise<string> => {
  const filename = `${uuidv4()}`;
  return new Promise(async (resolve, reject) =>
    createReadStream()
      .pipe(
        createWriteStream(
          `public/${filename}.jpeg`,
        ),
      )
      .on('finish', () => {
        if (oldPictureName) {
          try {
            unlinkSync(
              `public/${oldPictureName}.jpeg`,
            );
          } catch (err) {}
        }
        return resolve(filename);
      })
      .on('error', () => null),
  );
};

export const unlinkAcceptedCandidatePicture = (
  filename: string,
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      unlinkSync(`public/${filename}.jpeg`);
      resolve(true);
    } catch (err) {
      reject(false);
    }
  });
};
