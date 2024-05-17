import { create, Whatsapp, Message, SocketState } from "venom-bot";
import  parsePhoneNumber, { isValidPhoneNumber }  from "libphonenumber-js";

class Sender {
    private client: Whatsapp

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
        const qrcode = (bae64Qrimg: string) => {}

        const status = (statusSession: string) => {}

        const start = (client: Whatsapp) => {
            this.client = client

            this.sendText('5519900000000@c.us', 'Olá, tudo bem?')
        }

        create("zap-bot", qrcode, status)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }
}

export default Sender