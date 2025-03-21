input.onGesture(Gesture.EightG, function () {
    btlogger("9g")
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
    music.play(music.stringPlayable("F G A - - - - - ", 960), music.PlaybackMode.InBackground)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    music.play(music.stringPlayable("A G F - - - - - ", 960), music.PlaybackMode.InBackground)
})
input.onButtonPressed(Button.A, function () {
    // send a string
    basic.showString("A")
})
input.onGesture(Gesture.FreeFall, function () {
    btlogger("free fall")
})
input.onGesture(Gesture.LogoUp, function () {
    btlogger("logo up")
})
input.onGesture(Gesture.TiltLeft, function () {
    btlogger("tilt left")
})
input.onGesture(Gesture.SixG, function () {
    btlogger("6g")
})
function echo_sensors () {
    music.play(music.stringPlayable("G - G - G - - - ", 960), music.PlaybackMode.UntilDone)
    btlogger("sound level" + input.soundLevel())
    btlogger("light level:" + input.lightLevel())
    btlogger("temperature " + input.temperature())
    btlogger("compass heading " + input.compassHeading())
    btlogger("rotation pitch" + input.rotation(Rotation.Pitch) + "roll" + input.rotation(Rotation.Roll))
    btlogger("acceleration X " + input.acceleration(Dimension.X) + " Y " + input.acceleration(Dimension.Y) + " Z " + input.acceleration(Dimension.Z) + "Strength" + input.acceleration(Dimension.Strength))
    btlogger("magnetix X" + input.magneticForce(Dimension.X) + " Y " + input.magneticForce(Dimension.Z) + " Z " + input.magneticForce(Dimension.X) + " strenght" + input.magneticForce(Dimension.Strength))
}
input.onGesture(Gesture.ScreenUp, function () {
    btlogger("screen up")
})
function btlogger (msg: string) {
    bluetooth.uartWriteString(msg)
}
input.onGesture(Gesture.ScreenDown, function () {
    btlogger("screen down")
})
input.onSound(DetectedSound.Loud, function () {
    btlogger("loud sound" + input.soundLevel())
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    // receive a string and shot it.
    msg = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    basic.showString(msg)
})
input.onGesture(Gesture.Shake, function () {
    btlogger("shake")
})
input.onGesture(Gesture.TiltRight, function () {
    btlogger("titl right")
})
input.onGesture(Gesture.LogoDown, function () {
    btlogger("logo down")
})
function searchObject () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        btlogger("" + huskylens.readeBox(1, Content1.xCenter))
    }
}
input.onGesture(Gesture.ThreeG, function () {
    btlogger("3g")
})
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
    if (input.runningTime() % 250 == 0) {
        echo_sensors()
    }
})
