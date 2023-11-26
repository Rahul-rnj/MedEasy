path = require('path')

let PROJECT_ROOT_DIR = path.join(__dirname, '../../');
let UPLOAD_PROD_IMG_DIR = path.join(PROJECT_ROOT_DIR, '/uploads');
module.exports ={
    PROJECT_ROOT_DIR: PROJECT_ROOT_DIR,
    UPLOAD_PROD_IMG_DIR:UPLOAD_PROD_IMG_DIR
}