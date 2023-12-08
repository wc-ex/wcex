import { encodeWAV } from "./transform"

let _audioCtx:AudioContext|undefined=undefined
let _ttsWsConnection:WebSocket|undefined=undefined

export class TtsStream {

    private _audioSrcNodes: AudioBufferSourceNode[] = []
    private _playStartedAt = 0
    private _totalTimeScheduled = 0
    constructor(private _host:string) {
    }

    // base64转换
    private _base64ToUint8Array(base64String: any) {
        // const padding = '='.repeat((4 - base64String.length % 4) % 4);
        // const base64 = (base64String + padding)
        //                 .replace(/-/g, '+')
        //                 .replace(/_/g, '/');

        const rawData = window.atob(base64String);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    stop() {
        _audioCtx?.close()
        _audioCtx = undefined
        this._playStartedAt = 0
        this._totalTimeScheduled = 0
        this._audioSrcNodes = []
        _ttsWsConnection?.close()
        _ttsWsConnection=undefined
    }

    async wsTts(text: string, spk_id = 0): Promise<any> {
        this.stop()
        _audioCtx = new AudioContext()

        text = `测试一下1234 A B 看看就六 月`

        // 将文本分段,并去除空行
        let paragraphs = text.split("\n").map((item) => item.trim()).filter((item) => item.length > 0)
        let curIndex = 0
        let paraDelay=0
        return new Promise((resolve, reject) => {
            _ttsWsConnection = new WebSocket(`ws://${this._host}/paddlespeech/tts/streaming`)
            let session = ""
            console.log("text", text)

            _ttsWsConnection.onopen = () => {
                console.log("ws open")
                _ttsWsConnection?.send(JSON.stringify(
                    {
                        "task": "tts",
                        "signal": "start"
                    }))
            }
            _ttsWsConnection.onclose = () => {
                console.log("ws close")
                resolve("ok")
            }
            _ttsWsConnection.onerror = (err) => {
                console.log("ws error", err)
                reject(err)
            }
            _ttsWsConnection.onmessage = (e) => {

                let data = JSON.parse(e.data)
                if (data.signal === "server ready") {
                    console.log("server ready:", data.session)
                    session = data.session
                    _ttsWsConnection?.send(JSON.stringify(
                        {
                            text: paragraphs[curIndex],
                            spk_id,
                        }))
                } else if (data.status == 1) {
                    // 接收到音频数据
                    console.log("audio continue:", data.audio.length)
                    let audio = this._base64ToUint8Array(data.audio)
                    let view = new DataView(audio.buffer);
                    let wavData = encodeWAV(view, 24000, 24000, 1, 16, true)

                    console.log("wavData:", wavData.byteLength)

                    this._schedulePlaybackWave(wavData.buffer,paraDelay)
                    paraDelay=0
                } else if (data.status == 2) {
                    console.log("text para end:", session, data.audio.length)

                    if (curIndex < paragraphs.length - 1) {
                        // 还有段落
                        curIndex++
                        // 段落之间的间隔
                        paraDelay=0.7

                        _ttsWsConnection?.send(JSON.stringify(
                            {
                                text: paragraphs[curIndex],
                                spk_id
                            }))
                    } else {
                        // 没有段落了
                        _ttsWsConnection?.send(JSON.stringify(
                            {
                                "task": "tts",
                                "signal": "end",
                                session
                            }))
                        setTimeout(() => {
                            _ttsWsConnection?.close()
                        }, 100)
                    }
                }
            }
        })
    }


    private _schedulePlaybackWave(wavData: ArrayBuffer,endDelay:number) {
        _audioCtx?.decodeAudioData(wavData, (audioBuffer) => {
            console.log("audioBuffer:", audioBuffer)
            const audioSrc = _audioCtx?.createBufferSource()
            if(audioSrc && _audioCtx){
                audioSrc.onended = () => {
                    this._audioSrcNodes.shift();
                    if (this._audioSrcNodes.length === 0) {
                        // 全部完成
                        console.log("----PLAY END----")
                    }
                };    
                this._audioSrcNodes.push(audioSrc);
                let startDelay = 0;
                if (!this._playStartedAt) {
                    startDelay = 10 / 1000;
                    this._playStartedAt = _audioCtx.currentTime + startDelay;
                }
                audioSrc.buffer = audioBuffer;
                audioSrc.connect(_audioCtx.destination);
    
                const startAt = this._playStartedAt + this._totalTimeScheduled + endDelay;
                audioSrc.start(startAt);
    
                this._totalTimeScheduled += audioBuffer.duration +endDelay;
            }
        }, (e) => {
            console.error("decodeAudioData Error:", e)
        })

    }
}