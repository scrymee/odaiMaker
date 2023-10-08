



/*!
* Chaffle
* Shuffle Characters Randomly.
* http://blivesta.github.io/chaffle
* License : MIT
* Author : blivesta (http://blivesta.com/)
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof exports === 'object') {
        module.exports = factory()
    } else {
        root.Chaffle = factory()
    }
})(this, function () {
    'use strict'

    function extend() {
        var extended = {}
        var deep = false

        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0]
            i++
        }

        function merge(obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = extend(true, extended[prop], obj[prop])
                    } else {
                        extended[prop] = obj[prop]
                    }
                }
            }
        }

        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i]
            merge(obj)
        }

        return extended
    }

    function Chaffle(element, options) {
        var data = {}
        var dataLang = element.getAttribute('data-chaffle')
        var dataSpeed = element.getAttribute('data-chaffle-speed')
        var dataDelay = element.getAttribute('data-chaffle-delay')

        if (dataLang.length !== 0) data.lang = dataLang
        if (dataSpeed !== null) data.speed = Number(dataSpeed)
        if (dataDelay !== null) data.delay = Number(dataDelay)

        this.options = {
            lang: 'en',
            speed: 20,
            delay: 100,
        }

        this.options = extend(this.options, options, data)
        this.element = element
        this.text = this.element.textContent
        this.substitution = ''
        this.state = false
        this.shuffleProps = []
        this.reinstateProps = []
    }

    Chaffle.prototype = {
        constructor: Chaffle,
        init: async function (textList) {
            var self = this

            if (self.state) return

            self.clearShuffleTimer()
            self.clearReinstateTimer()

            self.state = true
            self.substitution = ''
            self.shuffleProps = []
            self.reinstateProps = []
            // テキストの定義
            self.text = self.getRandomText(textList)

            var shuffleTimer = setInterval(function () {
                self.shuffle()
            }, self.options.speed)
            // // ディレイ処理を追加する
            // await new Promise(s => setTimeout(s, 1000))

            self.shuffleProps = shuffleTimer
        },

        stop: function () {
            var self = this
            console.log(self)
            var reinstateTimer = setInterval(function () {
                self.reinstate()
            }, self.options.delay)
            self.reinstateProps = reinstateTimer
        },

        // 文字列の配列からランダムに一つ抜き出す
        getRandomText: function (categoryList) {
            return categoryList[Math.floor(Math.random() * categoryList.length)]

        },

        shuffle: function () {
            this.element.textContent = this.substitution

            //ToDo:改行やスペースを取り除く処理は必要
            var textLength = this.text.length
            var substitutionLength = this.substitution.length

            if ((textLength - substitutionLength) > 0) {
                for (var i = 0; i <= textLength - substitutionLength; i++) {
                    this.element.textContent = this.element.textContent + this.randomStr()
                }
            } else {
                this.clearShuffleTimer()
            }
        },

        reinstate: function () {
            var textLength = this.text.length
            var substitutionLength = this.substitution.length

            if (substitutionLength < textLength) {
                this.element.textContent = this.substitution = this.text.substr(0, substitutionLength + 1)
            } else {
                this.clearReinstateTimer()
            }

            this.state = false
        },

        clearShuffleTimer: function () {
            return clearInterval(this.shuffleProps)
        },

        clearReinstateTimer: function () {
            return clearInterval(this.reinstateProps)
        },

        randomStr: function () {
            var str
            switch (this.options.lang) {
                case 'en':
                    str = String.fromCharCode(33 + Math.round(Math.random() * 99))
                    break

                case 'ja':
                    str = String.fromCharCode(19968 + Math.round(Math.random() * 80))
                    break

                case 'ja-hiragana':
                    str = String.fromCharCode(12353 + Math.round(Math.random() * 85))
                    break

                case 'ja-katakana':
                    str = String.fromCharCode(12449 + Math.round(Math.random() * 85))
                    break

                case 'ua':
                    str = String.fromCharCode(1040 + Math.round(Math.random() * 55))
                    break

                case 'cn':
                    str = String.fromCharCode(19968 + Math.floor(Math.random() * 20901))
                    break
                //ToDO:追加
                case 'original':
                    const content = 'どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪どうあくな種族であったそうだ。この書生というのは時々我々を捕つかまえて煮にて食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌てのひらに載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始みはじめであろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶やかんだ。その後ご猫にもだいぶ逢あったがこんな片輪かたわには一度も出会でくわした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙けむりを吹く。どうも咽むせぽくて実に弱った。これが人間の飲む煙草たばこというものである事はようやくこの頃知った。'
                    // console.log(Math.floor(Math.random() * content.length))
                    str = content.split('')[Math.floor(Math.random() * content.length)]
                    break
            }
            return str
        },
    }

    return Chaffle
})