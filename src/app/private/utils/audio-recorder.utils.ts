
export class AudioRecorder {
    private stream!: MediaStream;
    private mediaRecorder!: MediaRecorder
    private audioChunks: any[] = []
    private minDuration!: number

    constructor(minDuration: number = 3) {
        this.minDuration = minDuration
    }

    private durationValidator(src: string, minDuration: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            var audio = new Audio();
            audio.addEventListener('loadedmetadata', () => {
                if (audio.duration == Infinity) {
                    audio.currentTime = 1e101
                    function getDuration() {
                        audio.currentTime = 0
                        audio.removeEventListener('timeupdate', getDuration)
                        console.log(audio.duration, minDuration);
                        resolve(audio.duration > minDuration)
                    }
                    audio.addEventListener('timeupdate', getDuration)
                } else {
                    console.log(audio.duration, minDuration);
                    resolve(audio.duration > minDuration)
                }
            })
            audio.src = src;
        })
    }

    startRecording(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream: MediaStream) => {
                    this.stream = stream
                    this.mediaRecorder = new MediaRecorder(stream)
                    this.mediaRecorder.ondataavailable = (e) => this.audioChunks.push(e.data)
                    this.mediaRecorder.start()
                    resolve(true)
                })
                .catch(err => resolve(false))
        })
    }

    stopRecording(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(this.audioChunks);
                if (audioBlob.size <= 0) reject('')
                const audioUrl = URL.createObjectURL(audioBlob);
                this.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop())
                this.audioChunks = []
                const validation = await this.durationValidator(audioUrl, this.minDuration)
                validation ? resolve(audioUrl) : reject('')
            }
            this.mediaRecorder.stop()
        })
    }
}