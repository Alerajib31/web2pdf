async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const content = document.getElementById('content');

    // Set the PDF dimensions to match the content's aspect ratio
    const contentWidth = content.offsetWidth;
    const contentHeight = content.offsetHeight;
    const aspectRatio = contentWidth / contentHeight;
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = pdfWidth / aspectRatio;

    // Create a new jsPDF instance
    const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
    });

    try {
        // Hide the button during capture
        const button = document.querySelector('button');
        button.style.display = 'none';

        // Set white background and remove shadows for better PDF look
        content.style.backgroundColor = 'black';
        content.style.boxShadow = 'none';
        document.querySelectorAll('.team').forEach(team => {
            team.style.boxShadow = 'none';
        });

        // Use html2canvas to capture the content
        const canvas = await html2canvas(content, {
            scale: 2, // Increase for better quality
            useCORS: true,
            logging: false,
            backgroundColor: null
        });

        // Add the image to the PDF
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // Generate and download the PDF
        pdf.save('nba_information.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
    } finally {
        // Revert changes
        const button = document.querySelector('button');
        button.style.display = 'block';
        content.style.backgroundColor = '';
        content.style.boxShadow = '';
        document.querySelectorAll('.team').forEach(team => {
            team.style.boxShadow = '';
        });
    }
}



