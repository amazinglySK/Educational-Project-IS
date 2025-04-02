import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({apiKey: apiKey});

export const getPDFContent = async (fileName: string, file: Blob) => {
  const uploaded_pdf = await client.files.upload({
    file: {
      fileName,
      content: file,
    },
    purpose: "ocr",
  })

  const signedUrl = await client.files.getSignedUrl({
    fileId: uploaded_pdf.id,
  });

  const ocrResponse = await client.ocr.process({
    model: "mistral-ocr-latest",
    document: {
        type: "document_url",
        documentUrl: signedUrl.url,
    },
  });

  console.log(ocrResponse);

  return ocrResponse;
}