bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
    music.play(music.stringPlayable("E E E G G E E E ", 960), music.PlaybackMode.InBackground)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    music.play(music.stringPlayable("E E E C C E E E ", 960), music.PlaybackMode.InBackground)
})
input.onButtonPressed(Button.A, function () {
    // send a string
    basic.showString("A")
})
function btlogger (msg: string) {
    bluetooth.uartWriteString(msg)
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    // receive a string and shot it.
    msg = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    basic.showString(msg)
})
function searchObject () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        btlogger("" + huskylens.readeBox(1, Content1.xCenter))
    }
}
let msg = ""
basic.showIcon(IconNames.Square)
music.setVolume(255)
bluetooth.startUartService()
basic.showIcon(IconNames.SmallSquare)
huskylens.initI2c()
basic.showIcon(IconNames.SmallDiamond)
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
basic.forever(function () {
    searchObject()
})
