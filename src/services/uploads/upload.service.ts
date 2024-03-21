// Initializes the `uploads` service on path `/uploads`
import { Application } from '../../declarations'
import AWS from 'aws-sdk'
import multer from 'multer'

export default (app: Application) => {
  const aws = app.get('aws')

  AWS.config.update({
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey,
    region: 'us-east-1'
  })

  const s3 = new AWS.S3()

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024 // limit file size to 5MB
    }
  })

  // Initialize our service with any options it requires
  app.post('/upload', upload.single('file'), (req: any, res: any) => {
    const params = {
      Bucket: aws.bucket,
      Key: req.file.originalname,
      Body: req.file.buffer
    }

    s3.upload(params, (err: any, data: any) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Error uploading file')
      }

      const responseData = {
        message: 'File uploaded successfully',
        url: data.Location
      }

      res.json(responseData)
    })
  })
}
