import { create, Whatsapp, Message, SocketState } from "venom-bot";
import { start } from "repl";

class Sender {
    private client: Whatsapp

    constructor() {
        this.initialize()
    }

    private initialize() {
        const qrcode = (bae64Qrimg: string) => {}

        const status = (statusSession: string) => {}

        const start = (client: Whatsapp) => {
            this.client = client
        }

        create("zap-bot", qrcode, status)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }
}

export default Sender