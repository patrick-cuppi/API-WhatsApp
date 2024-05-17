import { create, Whatsapp, Message, SocketState } from "venom-bot";
import { start } from "repl";

class Sender {
    private client: Whatsapp

    constructor() {
        this.initialize()
    }

    async sendText(to: string, body: string) {
        
        this.client.sendText(to, body)
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