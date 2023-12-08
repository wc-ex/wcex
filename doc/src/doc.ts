import { Scope } from "wcex"
import { TtsStream } from "./utils/tts/ttsStream"

export default class extends Scope {
    _ttsStream = new TtsStream("localhost:8192")
    allLang = {
        cn: {
            display: "中文",
            icon: { pkg: 'flag-icons/flags', type: "4x3", icon: 'cn' }
        },
        en: {
            display: "English",
            icon: { pkg: 'flag-icons/flags', type: "4x3", icon: 'us' }
        },
        jp: {
            display: "日本語",
            icon: { pkg: 'flag-icons/flags', type: "4x3", icon: 'jp' }
        },
    }

    async onRead() {
        // _audioCtx.close()
        // _audioCtx = new AudioContext()
        // this._reset()

        const text = this.$id.marked.shadowRoot?.getElementById("content")?.innerText.replace(/<>/g, "") || "你好"
        // const text = "热烈欢迎您在 Discussions 中提交问题，并在 Issues 中指出发现的 bug。此外，我们非常希望您参与到 Paddle Speech 的开发中！"
        await this._ttsStream.wsTts(text,0)
        // let ret = await (await fetch("http://localhost:8090/paddlespeech/tts", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ text, spk_id:55, speed: 1.0 ,save_path: "./tts5.wav"})
        // })).json()
        // console.log("ret:", ret)

        console.log("---- ALL TTS END ----")

    }
    onStop() {
        this._ttsStream.stop()
    }
  
}