const fs = require('fs');
const path = require('path');
const textract = require('textract');
const pdfParse = require('pdf-parse');

// Mock verification function with detailed checks
const verifyDocument = async (filePath) => {
    try {
        const fileExtension = path.extname(filePath).toLowerCase();

        // Check for valid file type
        const validFileTypes = ['.pdf', '.doc', '.docx', '.txt'];
        if (!validFileTypes.includes(fileExtension)) {
            return { verified: false, reason: 'Invalid file type' };
        }

        // Read and verify document content
        let documentContent = '';
        if (fileExtension === '.pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const pdfData = await pdfParse(dataBuffer);
            documentContent = pdfData.text;
        } else {
            documentContent = await extractTextFromFile(filePath);
        }

        // Check for specific keywords in the content
        // const keywords = ['important', 'confidential', 'verified'];
        // const containsKeywords = keywords.every(keyword => documentContent.includes(keyword));
        // if (!containsKeywords) {
        //     return { verified: false, reason: 'Missing required keywords' };
        // }

        // Perform additional checks (e.g., metadata)
        const metadata = getMetadata(filePath);
        if (!metadata.author || !metadata.date) {
            return { verified: false, reason: 'Missing metadata' };
        }

        return { verified: true, reason: 'Document is verified' };
    } catch (error) {
        console.error(error);
        return { verified: false, reason: 'Verification process failed' };
    }
};

// Helper function to extract text from a file
const extractTextFromFile = (filePath) => {
    return new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (error, text) => {
            if (error) {
                return reject(error);
            }
            resolve(text);
        });
    });
};

// Mock function to get metadata (this is an example, implement actual logic as needed)
// const getMetadata = (filePath) => {
//     // Example metadata extraction logic
//     // In a real-world scenario, use a library to extract metadata
//     return {
//         author: 'John Doe',
//         date: '2024-01-01'
//     };
// };

// Endpoint to verify document
app.post('/verify', async (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).send({ message: 'File path is required' });
    }

    const verificationResult = await verifyDocument(filePath);

    res.status(200).send({
        message: verificationResult.verified ? 'Document is verified' : 'Document verification failed',
        reason: verificationResult.reason,
        verified: verificationResult.verified
    });
});
