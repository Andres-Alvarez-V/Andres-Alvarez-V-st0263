// Función para generar un nombre de archivo aleatorio
const generateRandomFileName = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomFileName = "";
  for (let i = 0; i < length; i++) {
      randomFileName += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return randomFileName;
}

// Uso de la función para generar un nombre de archivo aleatorio de 8 caracteres de longitud
const filenames = [];
for (let i = 0; i < 2; i++) {
  filenames.push(generateRandomFileName(8));
}


const customLogger = () => {
  console.log("-------");
  console.log("Filenames:");
  filenames.forEach(filename => {
      console.log(`  ${filename}`);
  });
  console.log("-------");
}

module.exports = {
  filenames: filenames,
  customLogger
};