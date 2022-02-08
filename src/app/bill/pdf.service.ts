import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generalPDFHeaderHTML(documentTitle, htmlContent, fileName) {
    const doc = new jsPDF("landscape");
    let vh = this.addBanner(doc,documentTitle);
    autoTable(doc, {
      styles: { fontSize: 8, cellPadding: 1 },
      html: htmlContent,
      margin: { top: vh += 10 },
      theme: 'grid',
      headStyles: { fillColor: "#DCDCDC", textColor: "#000", fontStyle: "bold" },
      footStyles: { fillColor: "#DCDCDC", textColor: "#000", fontStyle: "bold" }
    });
    doc.save(fileName + "_" + new Date().toISOString() + '.pdf');
  }

  generalPDFHeaderJSON(documentTitle, jsonBody, fileName) {
    const doc = new jsPDF("landscape");
    let vh = this.addBanner(doc,documentTitle);
    autoTable(doc, {
      styles: { fontSize: 9, cellPadding: 1 },
      margin: { top: vh += 10 },
      didDrawPage: function (data) {
        // Reseting top margin. The change will be reflected only after print the first page.
        data.settings.margin.top = 10;
      },
      theme: 'grid',
      headStyles: { fillColor: "#DCDCDC", textColor: "#000", fontStyle: "bold" },
      footStyles: { fillColor: "#DCDCDC", textColor: "#000", fontStyle: "bold" },
      body: jsonBody,
      columns: [
        { header: "Customer name", dataKey: "applicantName" },
        { header: "Mobile number", dataKey: "mobileNumber" },
        { header: "Account number", dataKey: "accountNumber" },
        { header: "Meter number", dataKey: "meterNumber" },
        { header: "Control number", dataKey: "controlNumber" },
        { header: "Zone name", dataKey: "zoneName" },
        { header: "Route name", dataKey: "routeName" },
        { header: "Balance BF", dataKey: "balanceB4Bill" },
        { header: "Current Bill", dataKey: "currentBillAmount" },
        { header: "Account balance", dataKey: "accountBalance" },
      ]
    });
    doc.save(fileName + "_" + new Date().toISOString() + '.pdf');
  }

  // print Payments
  createHeaderedPDFJSON(documentTitle, jsonBody, jsonColumns, fileName) {
    const doc = new jsPDF("landscape");
    let vh = this.addBanner(doc,documentTitle);
    autoTable(doc, {
      styles: { fontSize: 9, cellPadding: 1 },
      margin: { top: vh += 5 },
      didDrawPage: function (data) {
        // Reseting top margin. The change will be reflected only after print the first page.
        data.settings.margin.top = 10;
      },
      theme: 'grid',
      headStyles: { fillColor: "#DCDCDC", textColor: "#000", fontStyle: "bold" },
      footStyles: { fillColor: "#DCDCDC", textColor: "#000", fontStyle: "bold" },
      bodyStyles: {  textColor: "#000" },
      body: jsonBody,
      columns: jsonColumns
    });
    doc.output("dataurlnewwindow");
  }



  pdfyAccounts(jsonBody) {
    const doc = new jsPDF("landscape");
    let vh = this.addBanner(doc,"CUSTOMER ACCOUNTS");

    autoTable(doc, {
      styles: { fontSize: 9, cellPadding: 1 },
      margin: { top: vh += 10 },
      didDrawPage: function (data) {
        // Reseting top margin. The change will be reflected only after print the first page.
        data.settings.margin.top = 10;
      },
      theme: 'grid',
      headStyles: { fillColor: "#DCDCDC", textColor: "#000", fontStyle: "bold" },
      footStyles: { fillColor: "#DCDCDC", textColor: "#000", fontStyle: "bold" },
      body: jsonBody,
      columns: [
        { header: "Customer name", dataKey: "applicantName" },
        { header: "Mobile number", dataKey: "mobileNumber" },
        { header: "Account number", dataKey: "accountNumber" },
        { header: "Meter number", dataKey: "meterNumber" },
        { header: "Control number", dataKey: "controlNumber" },
        { header: "Zone name", dataKey: "zoneName" },
        { header: "Route name", dataKey: "routeName" },
      ]
    });
    doc.save("customer_accounts_" + new Date().toISOString() + '.pdf');
  }

  public toFixed(money: any) {
    const pyb = parseFloat(money).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return pyb;
  }



  addBanner(doc: jsPDF, docTitle: string): number {
    var img = new Image();
    img.src = "assets/img/bibi-na-bwana.png";

    var pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var vh = 5;
    let instLogo = localStorage.getItem('instLogo');
    if (!instLogo) {
      doc.addImage(img, "PNG", pageWidth / 2 - 15, vh, 25, 25);
      doc.setFontSize(11);
      doc.setTextColor(30, 144, 255);
      doc.setFontType("bold");
      doc.text("THE UNITED REPUBLIC OF TANZANIA", pageWidth / 2, vh += 30, "center");
      doc.text("Tanzania Petroleum Development Corporation ", pageWidth / 2, vh += 5, "center");
      doc.text("Government Bill", pageWidth / 2, vh += 5, "center");
      doc.setFontType("normal");
      doc.setFontSize(10);
      if (docTitle) {
        doc.text(docTitle, pageWidth / 2, vh += 5, "center");
      }

    } else {
      doc.addImage(img, "PNG", 20, 8, 20, 20);
      doc.addImage(instLogo, "PNG", pageWidth - 40, 8, 20, 20);
      doc.setFontSize(11);
      doc.setTextColor(30, 144, 255);
      vh = 15;
      doc.setFontType("bold");
      doc.text("THE UNITED REPUBLIC OF TANZANIA", pageWidth / 2, vh, "center");
      doc.text("Tanzania Petroleum Development Corporation", pageWidth / 2, vh += 5, "center");
      doc.text(JSON.parse(localStorage.getItem('currentUser')).institution, pageWidth / 2, vh += 5, "center");
      doc.setFontType("normal");
      doc.setFontSize(10);
      if (docTitle) {
        doc.text(docTitle, pageWidth / 2, vh += 5, "center");
      }
    }
    vh += 2;
    doc.setTextColor(0, 0, 0);
    doc.setDrawColor(211, 211, 211);
    doc.line(10, vh += 1, pageWidth - 10, vh);
    doc.setDrawColor(0, 0, 0);
    vh += 2;
    return vh;
  }


  public popPDF(doc: jsPDF) {
    var string = doc.output('datauristring');
    var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    var x = window.open();
    x.document.open();
    x.document.write(embed);
    x.document.close();
  }


  public pdfConnectionMaterialByCategory(htmlContent) {
    const doc = new jsPDF();
    let vh = this.addBanner(doc, "Connection materials categories");
    autoTable(doc, {
      html: htmlContent,
      margin: { top: vh += 5 },
      theme: 'grid',
      headStyles: { fillColor: "#DCDCDC", textColor: "#000", fontStyle: "bold" },
      footStyles: { fillColor: "#DCDCDC", textColor: "#000", fontStyle: "bold" }
    });
    doc.output('dataurlnewwindow');
  }

}
