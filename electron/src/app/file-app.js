const { promisify } = require('util');
const os = require('os');
const fs = require('fs');
const path = require('path');
const appFolderName = 'integradorII';
const writeFileAsync = promisify(fs.writeFile);
const tempDir = os.tmpdir();

const workspace = os.tmpdir();

const createFileAsync = async ( filename ) => {
  const tempFilePath = path.join(tempDir, appFolderName, filename);

  if( fs.existsSync( tempFilePath ) ){
    return tempFilePath;
  }

  await writeFileAsync(tempFilePath, '');
  return tempFilePath;
}

const createFolder = ( foldername ) => {

  let folderPath = path.join(tempDir,appFolderName);
  if( appFolderName !== foldername ){
    folderPath = path.join(folderPath, foldername);
  }

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

const initTempFolder = () => {
  createFolder( appFolderName );
}

const loadConfiguration = ( jsonPathfile ) => {
  try {
    const jsonFile = path.join(__dirname, '../configuration', jsonPathfile);
    const rawConfig = fs.readFileSync(jsonFile, 'utf8');
    return JSON.parse(rawConfig);
  } catch (error) {
    console.error(`Error al cargar el archivo JSON ${jsonPathfile}:`, error);
    return null;
  }
}

const isExist = ( filePath ) => {
  return fs.existsSync(filePath);
}

const unzip = ( filePath, foldername ) => {

  console.log('Iniciando unzip');
  const nombreArchivo = path.basename(filePath);
  const filenameNoExtension = nombreArchivo.split('.')[1];

  return new Promise( (res, rej) => {

    const fullPath = path.join(workspace, foldername, filenameNoExtension);
    const folderPath = path.join(foldername, filenameNoExtension);
    createFolder(folderPath);

    const readStream = fs.createReadStream(filePath);
    const writeStream = unzipper.Extract({ path: fullPath });

    readStream.pipe(writeStream);

    writeStream.on('close', () => {
      res( { status: 'succeed' } );
    });

    writeStream.on('error', (err) => {
      console.log( err );
      rej( { status: 'error', error: err } );
    });

  });

}

const getStructureFile = ( pathfile ) => {
  const { dir, base } = path.parse(pathfile);
  return {
    folderpath: dir,
    filename: base,
  };
}

module.exports = {
  createFileAsync,
  createFolder,
  initTempFolder,
  loadConfiguration,
  isExist,
  workspace,
  unzip,
  getStructureFile
}
