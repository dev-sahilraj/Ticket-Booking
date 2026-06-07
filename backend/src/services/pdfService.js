const PDFDocument = require('pdfkit');

// Generate a Booking Ticket PDF
const generateTicketPDF = (booking, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Pipe the PDF directly to the response
  doc.pipe(res);

  // Styling & Header
  doc
    .fillColor('#4f46e5')
    .fontSize(24)
    .text('EventHub Ticket', { align: 'center' })
    .moveDown(1);

  doc
    .fillColor('#000000')
    .fontSize(12)
    .text(`Booking Reference: ${booking.bookingId}`, { align: 'right' })
    .text(`Date Issued: ${new Date().toLocaleDateString()}`, { align: 'right' })
    .moveDown(2);

  // Event Details
  doc.fontSize(16).fillColor('#333333').text('Event Information', { underline: true }).moveDown(0.5);
  doc.fontSize(12).fillColor('#000000')
    .text(`Event Name: ${booking.event.title}`)
    .text(`Date: ${new Date(booking.event.date).toLocaleDateString()}`)
    .text(`Time: ${booking.event.time}`)
    .text(`Venue: ${booking.event.venue}`)
    .moveDown(2);

  // Attendee Details
  doc.fontSize(16).fillColor('#333333').text('Attendee Information', { underline: true }).moveDown(0.5);
  doc.fontSize(12).fillColor('#000000')
    .text(`Name: ${booking.user.name}`)
    .text(`Email: ${booking.user.email}`)
    .text(`Tickets Purchased: ${booking.tickets}`)
    .text(`Status: ${booking.status}`)
    .moveDown(2);

  // Footer / Mock Barcode
  doc.moveDown(2);
  doc.rect(50, doc.y, 500, 50).stroke();
  doc.fontSize(10).fillColor('#666666').text('|||| |||||| |||| ||||||| |||||', doc.x, doc.y + 20, { align: 'center', characterSpacing: 5 });
  doc.moveDown(4);
  doc.text('Please present this ticket at the entrance. Valid for one-time scanning only.', { align: 'center' });

  // Finalize PDF file
  doc.end();
};

// Generate an Admin Report PDF
const generateAdminReportPDF = (reportType, data, res) => {
  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(res);

  doc
    .fillColor('#4f46e5')
    .fontSize(20)
    .text('EventHub Admin Report', { align: 'center' })
    .moveDown(0.5);

  doc
    .fillColor('#666666')
    .fontSize(12)
    .text(`Report Type: ${reportType.toUpperCase()}`, { align: 'center' })
    .text(`Generated On: ${new Date().toLocaleString()}`, { align: 'center' })
    .moveDown(2);

  doc.fillColor('#000000').fontSize(12);

  if (reportType === 'event-wise') {
    data.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.title}`);
      doc.text(`   Tickets Sold: ${item.ticketsSold}`);
      doc.moveDown(0.5);
    });
  } else if (reportType === 'user-wise') {
    data.forEach((item, index) => {
      doc.text(`${index + 1}. User: ${item.email}`);
      doc.text(`   Total Bookings: ${item.bookingCount}`);
      doc.text(`   Total Tickets Bought: ${item.ticketsBought}`);
      doc.moveDown(0.5);
    });
  } else {
    doc.text(`Total Bookings across platform: ${data.totalBookings}`);
  }

  doc.end();
};

module.exports = {
  generateTicketPDF,
  generateAdminReportPDF
};
