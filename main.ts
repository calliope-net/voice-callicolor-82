function macheEtwas (id: number) {
    if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W45)) {
        basic.clearScreen()
    } else if (id >= pins.voice_command_enum(pins.voice_FixedCommandWords.W52) && id <= pins.voice_command_enum(pins.voice_FixedCommandWords.W61)) {
        pins.comment(pins.pins_text("Display number 0-9"))
        basic.showNumber(id - 52)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W62)) {
        basic.showIcon(IconNames.Happy)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W63)) {
        basic.showIcon(IconNames.Sad)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W64)) {
        basic.showIcon(IconNames.Heart)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W65)) {
        basic.clearScreen()
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W69)) {
        basic.showNumber(input.temperature())
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W82)) {
        control.reset()
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W116)) {
    	
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W123)) {
        basic.setLedColor(0xffffff)
    } else {
        basic.turnRgbLedOff()
    }
}
function GitHub () {
    pins.comment(pins.pins_text("calliope-net/voice-callicolor-82"))
    pins.comment(pins.pins_text("4 Module: CalliColor, I2C: Voice, OLED, EEPROM"))
    pins.comment(pins.pins_text("3 Erweiterungen laden: mkleinsb/pxt-callicolor;"))
    pins.comment(pins.pins_text("calliope-net/pins; calliope-net/matrix"))
    pins.comment(pins.pins_text("Anleitung:"))
    pins.comment(pins.pins_text("elssner.github.io/ft-Controller-I2C/voice_konsole/"))
}
function Zeile1_7 (text: string) {
    matrix.clearMatrix(1, 7)
    zeilen = Math.trunc(text.length / 16)
    for (let Index = 0; Index <= zeilen; Index++) {
        matrix.writeTextEEPROM(Index + 1, 0, matrix.matrix_text(text.substr(Index * 16, 16)))
    }
    matrix.displayMatrix(1, 7, matrix.eI2C.I2C_x3C)
}
function Zeile0 (zahl: number) {
    matrix.clearMatrix(0, 0)
    matrix.writeTextEEPROM(0, 0, zahl)
    matrix.displayMatrix(0, 0, matrix.eI2C.I2C_x3C)
}
function callicolor (id: number) {
    if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W116)) {
        CalliColor.showCalliColor(0xff0000)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W117)) {
        CalliColor.showCalliColor(0xffaa00)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W118)) {
        CalliColor.showCalliColor(0xffff00)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W119)) {
        CalliColor.showCalliColor(0x00ff00)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W120)) {
        CalliColor.showCalliColor(0x00ffff)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W121)) {
        CalliColor.showCalliColor(0x0000ff)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W122)) {
        CalliColor.showCalliColor(0xff00ff)
    } else if (id == pins.voice_command_enum(pins.voice_FixedCommandWords.W123)) {
        CalliColor.showCalliColor(0xffffff)
    }
}
function zeigeUhr () {
    pins.rtc_read()
    matrix.clearMatrix()
    if (pins.keypadConnected()) {
        matrix.writeTextEEPROM(0, 3, pins.rtc_set_key(pins.keypad_read()))
    }
    matrix.writeClock(96, 32, 32, pins.rtc_get_int(pins.pins_rtc_eRegister(pins.rtc_eRegister.Stunde)), pins.rtc_get_int(pins.pins_rtc_eRegister(pins.rtc_eRegister.Minute)))
    matrix.writeTextEEPROM(0, 0, pins.rtc_get_string(pins.rtc_eFormat.mmss), 12, 8, matrix.eTransparent.t, matrix.matrix_eFaktor(matrix.eFaktor.f2), matrix.matrix_eFaktor(matrix.eFaktor.f2))
    matrix.writeTextEEPROM(4, 0, pins.rtc_get_int(pins.pins_rtc_eRegister(pins.rtc_eRegister.Stunde)), 16, 0, matrix.eTransparent.t, matrix.matrix_eFaktor(matrix.eFaktor.f3), matrix.matrix_eFaktor(matrix.eFaktor.f1))
    matrix.writeTextEEPROM(6, 0, pins.rtc_get_string(pins.rtc_eFormat.ddd))
    matrix.writeTextEEPROM(7, 0, pins.rtc_get_string(pins.rtc_eFormat.ddMMyy))
    matrix.displayMatrix()
    pins.rtc_25led(pins.rtc_e25led.Zeit)
}
let Kommando_ID = 0
let zeilen = 0
matrix.init(matrix.ePages.y64)
matrix.displayMatrix()
basic.pause(2000)
let wachzeit = pins.voice_register(pins.pins_voice_eRegister(pins.voice_eRegister.WAKE_TIME))
Zeile0(wachzeit)
let voice_connected = wachzeit > 0
if (voice_connected) {
    basic.setLedColor(0x00ff00)
} else {
    basic.setLedColor(0xff0000)
}
basic.forever(function () {
    if (voice_connected) {
        Kommando_ID = pins.voice_read_cmdid()
        if (Kommando_ID == pins.voice_command_enum(pins.voice_FixedCommandWords.W0)) {
            zeigeUhr()
            basic.pause(1000)
        } else {
            Zeile0(Kommando_ID)
            macheEtwas(Kommando_ID)
            callicolor(Kommando_ID)
            Zeile1_7(pins.voice_command_text_eeprom(Kommando_ID))
        }
    }
})
