import { PdfService } from './pdf.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { formatNumber } from '@angular/common';
import { Payment } from './payment';
import { Bill } from 'app/bill/bill';
import { User } from 'app/users/user';


@Injectable({
    providedIn: 'root'
})
export class PrintService {

    constructor(private http: HttpClient, private pdfService: PdfService) { 

    }

    printGePGReceipt(data: Payment, user: User, bill:Bill) {
        var doc = new jsPDF();
        var pageWidth =
            doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        // Exchequer Receipt
        let vh = this.pdfService.addBanner(doc, "Stakabadhi ya Malipo ya Serikali");

        doc.text("Receipt No", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(data.pspreceiptnumber, 70, vh);
        doc.setFontType("normal")

        doc.text("Received from", 15, vh += 7);
        doc.setFontType("bold");
        if (data.pyrname === null) {
            doc.text("--", 70, vh);
        } else {
            var name = data.pyrname;
            doc.text(name, 70, vh);
        }
        doc.setFontType("normal")
        doc.text("Paid amount", 15, vh += 7);
        doc.setFontType("bold")

        doc.text(parseFloat(data.paidamt.toString()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " (TZS)", 70, vh);
        doc.setFontType("normal")
        doc.text("Amount in words", 15, vh += 7);
        var converter = require('number-to-words');
        doc.setFontType("bold")
        doc.text(converter.toWords(data.paidamt.toString()).replace(/\b\w/g, first => first.toLocaleUpperCase()), 70, vh);
        doc.setFontType("normal")
        doc.text("In respect of", 15, vh += 7);
        doc.text("Item description (s)", 70, vh);
        doc.text("Item Amount", 177, vh);

        doc.line(10, vh += 2, 200, vh);

        doc.text("", 70, vh += 7);

        var total = parseFloat(data.paidamt.toString()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        doc.text(total, pageWidth - (total.length * 2 + 12), vh);
        // doc.text(amount+"", 177, vh);

        doc.line(70, vh += 2, 200, vh);

        doc.setFontType("bold")
        doc.text("Total billed amount", 70, vh += 7);
        var total = parseFloat(data.paidamt.toString()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " TZS";
        doc.text(total, pageWidth - (total.length * 2 + 12), vh);
        doc.line(70, vh += 2, 200, vh);

        doc.setFontType("normal")
        doc.text("Bill Ref", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(data.payrefid, 70, vh);
        doc.setFontType("normal")

        doc.text("Payment control number", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(data.payctrnum, 70, vh);
        doc.setFontType("normal")
        doc.text("Payment date", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(new Date(data.createdAt).toDateString(), 70, vh);
        doc.setFontType("normal")
        doc.text("Issued by", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(user.firstName + " " + user.lastName, 70, vh);
        doc.setFontType("normal")
        doc.text("Issued date", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(new Date().toDateString() + "", 70, vh);
        doc.setFontType("normal")
        doc.text("Signature", 15, vh += 10);
        doc.line(70, vh += 2, 150, vh);

        doc.autoPrint();
        doc.output("dataurlnewwindow")
    }

}




