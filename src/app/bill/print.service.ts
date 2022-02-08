import { PdfService } from './pdf.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { formatNumber } from '@angular/common';
import { Bill } from './bill';
import { Meter } from 'app/meters/meter';
import { User } from 'app/users/user';
import { Settings } from 'app/_models/settings';


@Injectable({
    providedIn: 'root'
})
export class PrintService {

    constructor(private http: HttpClient, private pdfService: PdfService) {

    }

    printGePGGovBill(data: Bill, officeName: string, qrData, meter: Meter, user: User, settings: Settings) {
        var doc = new jsPDF();
        var img = new Image();
        var pageHeight =
            doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth =
            doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        img.src = "assets/img/bibi-na-bwana.png";

        // doc.addImage(img, "PNG", 10, 8, 20, 20);
        // doc.addImage(img, "PNG", pageWidth - 30, 8, 20, 20);

        let vh = this.pdfService.addBanner(doc, null);


        // doc.setFontSize(11);
        // doc.setTextColor(30, 144, 255);
        // doc.text("The United Repulic of Tanzania", pageWidth / 2, 15, "center");

        // doc.setFontSize(12);
        // doc.setFontType("bold");
        // doc.text(officeName, pageWidth / 2, 20, "center");
        // doc.setFontType("normal");
        // doc.setFontSize(11);
        // doc.line(10, 30, 200, 30);
        // doc.text("Government Bill", pageWidth / 2, 25, "center");
        doc.setTextColor(0, 0, 0);
        doc.text("Customer name :", 15, 60)
        if (meter.customerName != null) {
            doc.text(meter.customerName, 70, 60)
        } else {
            doc.text("--", 70, 40)
        }
        doc.text("Control number", 15, 67);
        doc.text(data.controlNumber, 70, 67);
        doc.text("Payment Ref", 15, 74);
        doc.text(data.meterNumber, 70, 74);
        doc.text("Service Provider Code :", 15, 81);
        doc.text(settings.spCode, 70, 81);
        doc.text("Payer Name :", 15, 88);
        if (data.payerName != null) {
            doc.text(data.payerName, 70, 88);
        } else {
            doc.text("--", 70, 88);
        }

        doc.text("Payer Phone :", 15, 95);
        doc.text(data.payerCellNum, 70, 95);

        doc.text("Bill Description :", 15, 102);
        doc.text(data.payRemarks, 70, 102);

        // doc.setLineDash([0.2]);
        doc.line(10, 105, 200, 105);
        doc.text("Billed items :", 15, 112);
        doc.text(data.payRemarks, 70, 112);
        var ptAmount = data.amount + '';
        // data.charges.fore
        doc.text(parseFloat(ptAmount.toString()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","), pageWidth - ((ptAmount.length * 2) + 20), 112);
        
        doc.line(70, 129, 200, 129);
        var hcontrol = 136;
        var ptAmount = data.amount + '';
        doc.setFontType("bold");
        doc.text("Total Billed Amount: ", 70, hcontrol);
        doc.text(parseFloat(ptAmount.toString()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " (TZS)", pageWidth - ((ptAmount.length * 2) + 25), hcontrol);
    
        doc.line(70, hcontrol += 3, 200, hcontrol);
        doc.setFontType("normal");
        doc.text("Amount in words :", 15, hcontrol + 7);
        var converter = require('number-to-words');
        doc.setFontType("bold");
        doc.text(converter.toWords(data.amount.toString()).replace(/\b\w/g, first => first.toLocaleUpperCase()), 70, hcontrol += 7);
        doc.setFontType("normal");
        doc.text("Expires on :", 15, hcontrol += 7);
        if (data.expireDate != null) {
            doc.text(data.expireDate, 70, hcontrol);
        } else {
            doc.text("--", 70, hcontrol);
        }

        doc.text("Prepared by :", 15, hcontrol += 7);
        doc.setFontType("bold");
        doc.text(user.firstName + " " + user.lastName, 70, hcontrol);
        doc.setFontType("normal");
        doc.text(" ", 70, hcontrol);

        doc.text("Printed by :", 15, hcontrol += 7);
        doc.text(user.firstName + " " + user.lastName, 70, hcontrol);

        doc.text("Printed on :", 15, hcontrol += 7);
        doc.text(new Date().toDateString() + '', 70, hcontrol);

        doc.text("Signature", 15, hcontrol += 8);
        doc.text(": ________________________", 70, hcontrol);
        hcontrol += 5;
        var hcontrolL = hcontrol;
        doc.setFontSize(10);
        doc.text("Jinsi ya kulipia", 15, hcontrol += 8);
        doc.text("1. Kupitia Benki. Fika tawi lolote au wakala wa benki ya CRDB,", 15, hcontrol += 7);

        doc.text("NMB, BOT. Namba ya kumbukumbu :data.controlNumber ", 15, hcontrol += 7);
        doc.text("2. Kupitia Mitandao ya Simu:", 15, hcontrol += 7);
        doc.text(" * Ingia kwenye menu ya mtandao husika", 20, hcontrol += 7);

        doc.text(" * Chagua 4 (Lipa Bill)", 20, hcontrol += 7);
        doc.text(" * Chagua 5 (Malipo ya Serikali)", 20, hcontrol += 7);
        doc.text(" * Ingiza " + data.controlNumber + " kama namba ya kumbu kumbu", 20, hcontrol += 7);

        // how to pay
        doc.text("How to Pay", 115, hcontrolL += 8);
        doc.text("1. Via Bank: Visit any branch or bank agent of CRDB,", 115, hcontrolL += 7);
        doc.text("NMB, BOT. Reference Number: " + data.controlNumber, 115, hcontrolL += 7);
        doc.text("2. Via Mobile Network Operators (MNO): Enter to", 115, hcontrolL += 7);
        doc.text("* Select 4 (Make payments)", 120, hcontrolL += 7);
        doc.text("* Select 5 (Government Payments)", 120, hcontrolL += 7);
        doc.text("* Enter " + data.meterNumber + "  as reference number", 120, hcontrolL += 7);
        // add QR Code

        doc.addImage(qrData, "PNG", 150, 55, 35, 35);
        doc.setFontSize(6);
        doc.text("SCAN & PAY", 160, 93);

        // doc.save(
        //     "Bill_" +
        //     meterNumber +
        //     "_" +
        //     new Date().getFullYear() +
        //     "" +
        //     new Date().getMonth() +
        //     "" +
        //     new Date().getDate() +
        //     "" +
        //     new Date().getHours() +
        //     "" +
        //     new Date().getMinutes() +
        //     ".pdf"
        // );

        doc.autoPrint();
        doc.output("dataurlnewwindow")
    }


    printGePGGovBillWithInstitutionLogo(data: Bill, officeName: string, qrData, meterNumber) {
        var doc = new jsPDF();
        var img = new Image();
        var pageHeight =
            doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth =
            doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        img.src = "assets/img/bibi-na-bwana.png";

        doc.addImage(img, "PNG", 10, 8, 20, 20);
        doc.addImage(img, "PNG", pageWidth - 30, 8, 20, 20);

        // let vh = this.pdfService.addBanner(doc, "Government Bill");


        doc.setFontSize(11);
        doc.setTextColor(30, 144, 255);
        doc.text("The United Repulic of Tanzania", pageWidth / 2, 15, "center");

        doc.setFontSize(12);
        doc.setFontType("bold");
        doc.text(officeName, pageWidth / 2, 20, "center");
        doc.setFontType("normal");
        doc.setFontSize(11);
        doc.line(10, 30, 200, 30);
        doc.text("Government Bill", pageWidth / 2, 25, "center");
        doc.setTextColor(0, 0, 0);
        doc.text("Customer name", 15, 40)
        doc.text(data.payerCellNum, 70, 40)

        doc.text("Control number", 15, 47);
        doc.text(data.controlNumber, 70, 47);
        doc.text("Payment Ref", 15, 54);
        doc.text(data.controlNumber, 70, 54);
        doc.text("Service Provider Code", 15, 61);
        doc.text(data.subSpCode, 70, 61);
        doc.text("Payer Name", 15, 68);
        doc.text(data.payerCellNum, 70, 68);

        doc.text("Payer Phone", 15, 75);
        doc.text(data.payerCellNum, 70, 75);
        doc.text("Bill Description", 15, 82);
        doc.text(data.payRemarks, 70, 82);

        // doc.setLineDash([0.2]);
        doc.line(10, 85, 200, 85);
        doc.text("Billed items", 15, 92);
        doc.text(data.gepgPayType, 70, 92);
        var ptAmount = data.amount + '';
        // data.charges.fore
        doc.text(ptAmount, pageWidth - ((ptAmount.length * 2) + 15), 92);
        // doc.text(": EWURA",70,99);
        // var ptAmount = "89000";
        // doc.text(ptAmount,pageWidth - ((ptAmount.length * 2) + 15) , 99);
        // var ptAmount = "89000";
        // doc.text(": SEWAGE",70,106);
        doc.text(ptAmount, pageWidth - ((ptAmount.length * 2) + 15), 106);
        doc.line(70, 109, 200, 109);
        var hcontrol = 116;
        var ptAmount = data.amount + '';
        doc.text(ptAmount, 70, hcontrol);
        doc.text(ptAmount, pageWidth - ((ptAmount.length * 2) + 15), hcontrol);
        doc.line(70, hcontrol += 3, 200, hcontrol);
        doc.text("Amount in words", 15, hcontrol + 7);
        var converter = require('number-to-words');
        doc.text(converter.toWords(data.amount), 70, hcontrol += 7);

        doc.text("Expires on", 15, hcontrol += 7);
        doc.text("--", 70, hcontrol);
        doc.text("Prepared by", 15, hcontrol += 7);
        doc.text(": TPDC Platform", 70, hcontrol);
        // doc.text("Collection center", 15, hcontrol +=7);
        doc.text(" ", 70, hcontrol);

        doc.text("Printed by", 15, hcontrol += 7);
        doc.text("TPDC Admin", 70, hcontrol);

        doc.text("Printed on", 15, hcontrol += 7);
        doc.text(new Date() + '', 70, hcontrol);

        doc.text("Signature", 15, hcontrol += 8);
        doc.text(": ________________________", 70, hcontrol);
        hcontrol += 5;
        var hcontrolL = hcontrol;
        doc.setFontSize(10);
        doc.text("Jinsi ya kulipia", 15, hcontrol += 8);
        doc.text("1. Kupitia Benki. Fika tawi lolote au wakala wa benki ya CRDB,", 15, hcontrol += 7);

        doc.text("NMB, BOT. Namba ya kumbukumbu :data.controlNumber ", 15, hcontrol += 7);
        doc.text("2. Kupitia Mitandao ya Simu:", 15, hcontrol += 7);
        doc.text(" * Ingia kwenye menu ya mtandao husika", 20, hcontrol += 7);

        doc.text(" * Chagua 4 (Lipa Bill)", 20, hcontrol += 7);
        doc.text(" * Chagua 5 (Malipo ya Serikali)", 20, hcontrol += 7);
        doc.text(" * Ingiza " + data.controlNumber + " kama namba ya kumbu kumbu", 20, hcontrol += 7);

        // how to pay
        doc.text("How to Pay", 115, hcontrolL += 8);
        doc.text("1. Via Bank: Visit any branch or bank agent of CRDB,", 115, hcontrolL += 7);
        doc.text("NMB, BOT. Reference Number: " + data.controlNumber, 115, hcontrolL += 7);
        doc.text("2. Via Mobile Network Operators (MNO): Enter to", 115, hcontrolL += 7);
        doc.text("* Select 4 (Make payments)", 120, hcontrolL += 7);
        doc.text("* Select 5 (Government Payments)", 120, hcontrolL += 7);
        doc.text("* Enter " + data.meterNumber + "  as reference number", 120, hcontrolL += 7);
        // add QR Code

        doc.addImage(qrData, "PNG", 150, 35, 35, 35);
        doc.setFontSize(6);
        doc.text("SCAN & PAY", 160, 73);

        doc.save(
            "Bill_" +
            meterNumber +
            "_" +
            new Date().getFullYear() +
            "" +
            new Date().getMonth() +
            "" +
            new Date().getDate() +
            "" +
            new Date().getHours() +
            "" +
            new Date().getMinutes() +
            ".pdf"
        );
    }

    printGePGReceipt(receiptNo, payer, amount, balance, billref, controlN, paydate, remark) {
        var doc = new jsPDF();
        var pageWidth =
            doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        // Exchequer Receipt
        let vh = this.pdfService.addBanner(doc, "Stakabadhi ya Malipo ya Serikali");


        doc.text("Receipt No", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(receiptNo, 70, vh);
        doc.setFontType("normal")

        doc.text("Received from", 15, vh += 7);
        doc.setFontType("bold");
        if (payer === null) {
            doc.text("", 70, vh);
        } else {
            var name = payer.toUpperCase();
            doc.text(name, 70, vh);
        }
        doc.setFontType("normal")
        doc.text("Paid amount", 15, vh += 7);
        doc.setFontType("bold")

        doc.text(parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " (TZS)", 70, vh);
        doc.setFontType("normal")
        doc.text("Amount in words", 15, vh += 7);
        var converter = require('number-to-words');
        doc.setFontType("bold")
        doc.text(converter.toWords(amount).replace(/\b\w/g, first => first.toLocaleUpperCase()), 70, vh);
        doc.setFontType("normal")
        doc.text("In respect of", 15, vh += 7);
        doc.text("Item description (s)", 70, vh);
        doc.text("Item Amount", 177, vh);

        doc.line(10, vh += 2, 200, vh);

        doc.text(remark + "", 70, vh += 7);
        var total = parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        doc.text(total, pageWidth - (total.length * 2 + 12), vh);
        // doc.text(amount+"", 177, vh);

        doc.line(70, vh += 2, 200, vh);

        doc.setFontType("bold")
        doc.text("Total billed amount", 70, vh += 7);
        var total = parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " TZS";
        doc.text(total, pageWidth - (total.length * 2 + 12), vh);
        doc.line(70, vh += 2, 200, vh);

        doc.setFontType("normal")
        doc.text("Bill Ref", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(billref, 70, vh);
        doc.setFontType("normal")

        doc.text("Payment control number", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(controlN, 70, vh);
        doc.setFontType("normal")
        doc.text("Payment date", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(paydate, 70, vh);
        doc.setFontType("normal")
        doc.text("Issued by", 15, vh += 7);
        doc.setFontType("bold")
        doc.text("TPDC Admin", 70, vh);
        doc.setFontType("normal")
        doc.text("Issued date", 15, vh += 7);
        doc.setFontType("bold")
        doc.text(new Date() + "", 70, vh);
        doc.setFontType("normal")
        doc.text("Signature", 15, vh += 10);
        doc.line(70, vh += 2, 150, vh);

        doc.autoPrint();
        doc.output("dataurlnewwindow")
    }

}




