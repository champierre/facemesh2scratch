const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');
const ml5 = require('ml5');

const blockIconURI = 'data:image/png;base64,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';

const Message = {
  getX: {
    'ja': '[PERSON_NUMBER] 人目の [KEYPOINT] 番目の部位のx座標',
    'ja-Hira': '[PERSON_NUMBER] にんめの [KEYPOINT] ばんめのぶいのxざひょう',
    'en': 'x of person no: [PERSON_NUMBER] , keypoint no: [KEYPOINT]'
  },
  getY: {
    'ja': '[PERSON_NUMBER] 人目の [KEYPOINT] 番目の部位のy座標',
    'ja-Hira': '[PERSON_NUMBER] にんめの [KEYPOINT] ばんめのぶいのyざひょう',
    'en': 'y of person no: [PERSON_NUMBER] , keypoint no: [KEYPOINT]'
  },
  peopleCount: {
    'ja': '人数',
    'ja-Hira': 'にんずう',
    'en': 'people count'
  },
  videoToggle: {
    'ja': 'ビデオを [VIDEO_STATE] にする',
    'ja-Hira': 'ビデオを [VIDEO_STATE] にする',
    'en': 'turn video [VIDEO_STATE]'
  },
  setRatio: {
    'ja': '倍率を [RATIO] にする',
    'ja-Hira': 'ばいりつを [RATIO] にする',
    'en': 'set ratio to [RATIO]'
  },
  setInterval: {
    'ja': '認識を [INTERVAL] 秒ごとに行う',
    'ja-Hira': 'にんしきを [INTERVAL] びょうごとにおこなう',
    'en': 'Label once every [INTERVAL] seconds'
  },
  on: {
    'ja': '入',
    'ja-Hira': 'いり',
    'en': 'on'
  },
  off: {
    'ja': '切',
    'ja-Hira': 'きり',
    'en': 'off'
  },
  video_on_flipped: {
    'ja': '左右反転',
    'ja-Hira': 'さゆうはんてん',
    'en': 'on flipped',
  },
  please_wait: {
    'ja': '準備に時間がかかります。少しの間、操作ができなくなりますがお待ち下さい。',
    'ja-Hira': 'じゅんびにじかんがかかります。すこしのあいだ、そうさができなくなりますがおまちください。',
    'en': 'Setup takes a while. The browser will get stuck, but please wait.'
  }
}
const AvailableLocales = ['en', 'ja', 'ja-Hira'];

class Scratch3Facemesh2ScratchBlocks {
    get PERSON_NUMBER_MENU () {
      let person_number_menu = []
      for (let i = 1; i <= 10; i++) {
        person_number_menu.push({text: String(i), value: String(i)})
      }
      return person_number_menu;
    }

    get KEYPOINT_MENU () {
      let keypoint_menu = [];
      for (let i = 1; i <= 468; i++) {
        keypoint_menu.push({text: String(i), value: String(i)})
      }
      return keypoint_menu;
    }

    get VIDEO_MENU () {
      return [
          {
            text: Message.off[this._locale],
            value: 'off'
          },
          {
            text: Message.on[this._locale],
            value: 'on'
          },
          {
            text: Message.video_on_flipped[this._locale],
            value: 'on-flipped'
          }
      ]
    }

    get INTERVAL_MENU () {
      return [
          {
            text: '0.1',
            value: '0.1'
          },
          {
            text: '0.2',
            value: '0.2'
          },
          {
            text: '0.5',
            value: '0.5'
          },
          {
            text: '1.0',
            value: '1.0'
          }
      ]
    }

    get RATIO_MENU () {
      return [
          {
            text: '0.5',
            value: '0.5'
          },
          {
            text: '0.75',
            value: '0.75'
          },
          {
            text: '1',
            value: '1'
          },
          {
            text: '1.5',
            value: '1.5'
          },
          {
            text: '2.0',
            value: '2.0'
          }
      ]
    }

    constructor (runtime) {
        this.runtime = runtime;

        this.faces = [];
        this.ratio = 0.75;

        this.detectFace = () => {
          // We should reuse the video element created by videoProvider instead of creating a new video element
          // This is because iOS or iPad does not allow camera attached to two video elements
          this.video = this.runtime.ioDevices.video.provider.video

          alert(Message.please_wait[this._locale]);


          this.facemesh = ml5.facemesh(this.video, function() {
            console.log("Model loaded!")
          });

          this.facemesh.on('predict', faces => {
            if (faces.length < this.faces.length) {
              this.faces.splice(faces.length);
            }
            faces.forEach((face, index) => {
              this.faces[index] = {keypoints: face.scaledMesh};
            });
          });
        }

        this.runtime.ioDevices.video.enableVideo().then(this.detectFace)
    }

    getInfo () {
        this._locale = this.setLocale();

        return {
            id: 'facemesh2scratch',
            name: 'Facemesh2Scratch',
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'getX',
                    blockType: BlockType.REPORTER,
                    text: Message.getX[this._locale],
                    arguments: {
                        PERSON_NUMBER: {
                            type: ArgumentType.STRING,
                            menu: 'personNumberMenu',
                            defaultValue: '1'
                        },
                        KEYPOINT: {
                            type: ArgumentType.STRING,
                            menu: 'keypointMenu',
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'getY',
                    blockType: BlockType.REPORTER,
                    text: Message.getY[this._locale],
                    arguments: {
                        PERSON_NUMBER: {
                            type: ArgumentType.STRING,
                            menu: 'personNumberMenu',
                            defaultValue: '1'
                        },
                        KEYPOINT: {
                            type: ArgumentType.STRING,
                            menu: 'keypointMenu',
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'getPeopleCount',
                    blockType: BlockType.REPORTER,
                    text: Message.peopleCount[this._locale]
                },
                {
                    opcode: 'videoToggle',
                    blockType: BlockType.COMMAND,
                    text: Message.videoToggle[this._locale],
                    arguments: {
                        VIDEO_STATE: {
                            type: ArgumentType.STRING,
                            menu: 'videoMenu',
                            defaultValue: 'off'
                        }
                    }
                },
                {
                    opcode: 'setVideoTransparency',
                    text: formatMessage({
                        id: 'videoSensing.setVideoTransparency',
                        default: 'set video transparency to [TRANSPARENCY]',
                        description: 'Controls transparency of the video preview layer'
                    }),
                    arguments: {
                        TRANSPARENCY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    }
                },  
                {
                    opcode: 'setRatio',
                    blockType: BlockType.COMMAND,
                    text: Message.setRatio[this._locale],
                    arguments: {
                        RATIO: {
                            type: ArgumentType.STRING,
                            menu: 'ratioMenu',
                            defaultValue: '0.75'
                        }
                    }
                }
            ],
            menus: {
              personNumberMenu: {
                acceptReporters: true,
                items: this.PERSON_NUMBER_MENU
              },
              keypointMenu: {
                acceptReporters: true,
                items: this.KEYPOINT_MENU
              },
              videoMenu: {
                acceptReporters: true,
                items: this.VIDEO_MENU
              },
              ratioMenu: {
                acceptReporters: true,
                items: this.RATIO_MENU
              },
              intervalMenu: {
                acceptReporters: true,
                items: this.INTERVAL_MENU
              }
            }
        };
    }

    getX (args) {
      let personNumber = parseInt(args.PERSON_NUMBER, 10) - 1;
      let keypoint = parseInt(args.KEYPOINT, 10) - 1;

      if (this.faces[personNumber].keypoints && this.faces[personNumber].keypoints[keypoint]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.faces[personNumber].keypoints[keypoint][0] * this.ratio);
        } else {
          return 240 - this.faces[personNumber].keypoints[keypoint][0] * this.ratio;
        }
      } else {
        return "";
      }
    }

    getY (args) {
      let personNumber = parseInt(args.PERSON_NUMBER, 10) - 1;
      let keypoint = parseInt(args.KEYPOINT, 10) - 1;

      if (this.faces[personNumber].keypoints && this.faces[personNumber].keypoints[keypoint]) {
        return 180 - this.faces[personNumber].keypoints[keypoint][1] * this.ratio;
      } else {
        return "";
      }
    }

    getPeopleCount () {
      return this.faces.length;
    }

    videoToggle (args) {
      let state = args.VIDEO_STATE;
      if (state === 'off') {
        this.runtime.ioDevices.video.disableVideo();
        this.facemesh.video = null; // Stop the model prediction if video is off
      } else {
        this.runtime.ioDevices.video.enableVideo().then(this.detectFace);
        this.runtime.ioDevices.video.mirror = state === "on";
      }
    }

    /**
     * A scratch command block handle that configures the video preview's
     * transparency from passed arguments.
     * @param {object} args - the block arguments
     * @param {number} args.TRANSPARENCY - the transparency to set the video
     *   preview to
     */
    setVideoTransparency (args) {
        const transparency = Cast.toNumber(args.TRANSPARENCY);
        this.globalVideoTransparency = transparency;
        this.runtime.ioDevices.video.setPreviewGhost(transparency);
    }

    setRatio (args) {
      this.ratio = parseFloat(args.RATIO);
    }

    setLocale() {
      let locale = formatMessage.setup().locale;
      if (AvailableLocales.includes(locale)) {
        return locale;
      } else {
        return 'en';
      }
    }
}

module.exports = Scratch3Facemesh2ScratchBlocks;
