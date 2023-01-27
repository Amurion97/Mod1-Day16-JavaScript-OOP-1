class TextMessage {
    sender = "";
    receiver = "";
    date;
    content = "";

    constructor(sender, receiver, content, date) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.date = new Date(date);
    }
}

class Phone {
    sentText = [];
    inbox = [];

    setCurrentTextBlank() {
        this.currentText = new TextMessage(this.name, "", "");
    }

    constructor(name,) {
        this.name = name;
        this.battery = 100;
        this.onStatus = true;
        this.setCurrentTextBlank();
    }

    turnOn() {
        this.onStatus = true;
    }

    turnOff() {
        this.onStatus = false;
    }

    checkOnStatus() {
        if (this.checkBattery() === false) {
            alert("Battery runs out! Please charge!");
        } else if (this.onStatus === false) {
            alert("The phone is OFF");
        }
        return this.onStatus;
    }

    checkBattery() {
        if (this.battery <= 0) {
            this.onStatus = false;
            return false;
        }
        return true;
    }

    decreaseBattery() {
        this.battery--;
        this.checkBattery();
    }

    chargeUp(percentage) {
        this.battery += percentage;
        this.battery = (this.battery > 100) ? 100 : this.battery;
        this.battery = (this.battery < 0) ? 0 : this.battery;
        this.checkBattery();
    }

    newMessage() {
        this.decreaseBattery();
        this.currentText.date = new Date();
        this.currentText.sender = this.name;
        this.currentText.receiver = prompt("Enter receiver name: ", `${this.currentText.receiver}`);
        this.currentText.content = prompt("Enter the message: ", `${this.currentText.content}`);
    }

    receiveMessage(message) {
        this.decreaseBattery();
        let receivedMessage = new TextMessage(message.sender, message.receiver, message.content, message.date);
        this.inbox.push(receivedMessage);
    }

    sendMessage() {
        this.decreaseBattery();
        while (confirm(`Send to: \n${this.currentText.receiver}`) === false) {
            this.currentText.receiver = prompt("Enter the receiver: ", `${this.currentText.receiver}`);
        }
        while (confirm(`Send the current text: \n${this.currentText.content} \nto ${this.currentText.receiver} ?`) === false) {
            this.currentText.content = prompt("Enter the message: ", `${this.currentText.content}`);
        }
        this.currentText.date = new Date();
        let currentTextAddress = this.currentText;
        this.setCurrentTextBlank();

        this.sentText.push(currentTextAddress);
        return currentTextAddress;
    }

    showSent(windowID) {
        this.decreaseBattery();
        let result = "<table>"
            + "<tr>"
            + "<th>No.</th>"
            + "<th>Receiver</th>"
            + "<th>Message</th>"
            + "<th>Date</th>"
            + "</tr>";
        for (let i = 0; i < this.sentText.length; i++) {
            result += `<tr>`
                + `<td>${i + 1}</td>`
                + `<td>${this.sentText[i].receiver}</td>`
                + `<td>${this.sentText[i].content}</td>`
                + `<td>${this.sentText[i].date}</td>`
                + `</tr>`;
        }
        result += "</table>";
        document.getElementById(windowID).innerHTML = result;
    }

    showInbox(windowID) {
        this.decreaseBattery();
        let result = "<table>"
            + "<tr>"
            + "<th>No.</th>"
            + "<th>Sender</th>"
            + "<th>Message</th>"
            + "<th>Date</th>"
            + "</tr>";
        for (let i = 0; i < this.inbox.length; i++) {
            result += `<tr>`
                + `<td>${i + 1}</td>`
                + `<td>${this.inbox[i].sender}</td>`
                + `<td>${this.inbox[i].content}</td>`
                + `<td>${this.inbox[i].date}</td>`
                + `</tr>`;
        }
        result += "</table>";
        document.getElementById(windowID).innerHTML = result;
    }
}

let phoneBook = {
    "phone1": new Phone("Nokia"),
    "phone2": new Phone("iPhone")
};
const phoneIDs = {
    "Nokia": "phone1",
    "iPhone": "phone2"
}
// nokiaPhone.chargeUp(-99);
document.addEventListener("click", function (event) {
    let target = event.target;
    // let nokia = phoneBook.nokiaPhone;
    let phoneID = target.id.charAt(target.id.length - 1);
    // console.log(phoneID);
    let phone = phoneBook[("phone" + phoneID)];
    // console.log(phone);
    let buttonID = target.id.slice(0, target.id.length - 2);
    // console.log(buttonID);
    let windowID = "window-" + phoneID;
    switch (buttonID) {
        case "send-message":
            if (phone.checkOnStatus() === false) {
            } else {
                let sentMessage = phone.sendMessage();
                phoneBook[phoneIDs[sentMessage.receiver]].receiveMessage(sentMessage);
                // console.log(phone.currentText);
                console.log(phone);
            }
            break;
        case "new-message":
            if (phone.checkOnStatus() === false) {
            } else {
                phone.newMessage();
                // console.log(phone.currentText);
                console.log(phone)
            }
            break;
        case "show-sent":
            if (phone.checkOnStatus() === false) {
            } else {
                phone.showSent(windowID);
            }
            break;
        case "show-inbox":
            if (phone.checkOnStatus() === false) {
            } else {
                phone.showInbox(windowID);
            }
            break;
        case 'turn-on':
            if (phone.checkBattery() === false) {
            } else {
                phone.turnOn();
            }
            break;
        case "turn-off":
            phone.turnOff();
            break;
        case "charge":
            phone.chargeUp(parseInt(prompt("How many percentages have you charged?")));
            break;
    }
    printStatus("status-" + phoneID, phoneID);
})

function printStatus(windowID, phoneID) {
    let status = "";
    let phone = phoneBook[("phone" + phoneID)];
    status += `<p>Battery: ${phone.battery}</p>`;
    status += `<p>On/Off: ${(phone.onStatus) ? "ON" : "OFF"}</p>`;
    document.getElementById(windowID).innerHTML = status;
}

