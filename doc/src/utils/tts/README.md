## 服务器
- 启动
```
    cd /home
    ./runTtsStreamServer.sh
```

## 使用

```
    let _ttsStream = new TtsStream("localhost:8192")
    // 播报文章
    await this._ttsStream.wsTts(text,0)
    // 停止
    this._ttsStream.stop()


```
