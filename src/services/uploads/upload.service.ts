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
      fileSize: 10 * 1024 * 1024 // limit file size to 10MB
    }
  }).array('files', 5) // Allow uploading up to 5 files, adjust the number as needed

  // Initialize our service with any options it requires
  app.post('/upload', upload, (req: any, res: any) => {
    // If using upload.array, req.files will contain an array of files
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.')
    }

    // Upload each file to S3
    const uploadPromises = req.files.map((file: any) => {
      const params = {
        Bucket: aws.bucket,
        Key: file.originalname,
        Body: file.buffer
      }

      return new Promise((resolve, reject) => {
        s3.upload(params, (err: any, data: any) => {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            resolve(data.Location)
          }
        })
      })
    })

    // Wait for all uploads to complete
    Promise.all(uploadPromises)
      .then((uploadUrls) => {
        const responseData = {
          message: 'Files uploaded successfully',
          urls: uploadUrls
        }
        res.json(responseData)
      })
      .catch((error) => {
        console.error('Error uploading files:', error)
        res.status(500).send('Error uploading files')
      })
  })
}
