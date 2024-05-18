import { create, Whatsapp, Message, SocketState } from "venom-bot";
import  parsePhoneNumber, { isValidPhoneNumber }  from "libphonenumber-js";

export type QRCode = {
    base64Qr: string
    asciiQR: string
}
class Sender {
    private client: Whatsapp
    private isConnected: boolean
    private qrcode: QRCode

    get connected(): boolean {
        return this.isConnected
    }

    get qrCode(): QRCode {
        return this.qrcode
    }

    constructor() {
        this.initialize()
    }

    async sendText(to: string, body: string) {
        if(!isValidPhoneNumber(to, "BR")) {
            throw new Error('This number is not valid!')
        }

        let phoneNumber = parsePhoneNumber(to, "BR")?.format("E.164").replace('+', '') as string

        phoneNumber = phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`

        await this.client.sendText(phoneNumber, body)
    }

    private initialize() {
        const qrcode = (base64Qr: string, asciiQR: string) => {
            this.qrcode = { base64Qr, asciiQR }
        }

        const status = (statusSession: string) => {
            this.isConnected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(statusSession)
        }

        const start = (client: Whatsapp) => {
            this.client = client

            client.onStateChange((state) => {
                this.isConnected = state === SocketState.CONNECTED
            })
        }

        create("zap-bot", qrcode, status)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }
}

export default Sender