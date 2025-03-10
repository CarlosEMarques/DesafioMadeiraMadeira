// src/utils/downloadImage.ts
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Caminho absoluto para o diretório de imagens no host
const IMAGE_DIR = '/main-app/public/images'; // Altere para o caminho absoluto no host

export async function downloadImage(imageUrl: string): Promise<string> {
  // Criar o diretório se ele não existir
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
  }

  // Extrair o nome do arquivo da URL
  const imageName = imageUrl.split('/').pop() || 'default.jpg';
  const imagePath = path.join(IMAGE_DIR, imageName);

  // Verificar se a imagem já existe localmente
  if (fs.existsSync(imagePath)) {
    console.log(`Imagem já existe: ${imageName}`);
    return `/images/${imageName}`; // Retornar o caminho relativo
  }

  try {
    console.log(`Baixando imagem: ${imageName}`);
    const response = await axios({
      url: imageUrl,
      responseType: 'arraybuffer',
    });

    // Salvar a imagem no diretório local
    fs.writeFileSync(imagePath, response.data);
    console.log(`Imagem salva: ${imageName}`);
    return `/images/${imageName}`; // Retornar o caminho relativo
  } catch (error) {
    console.error(`Erro ao baixar a imagem: ${imageUrl}`, error);
    return '/images/default.jpg'; // Fallback para uma imagem padrão
  }
}