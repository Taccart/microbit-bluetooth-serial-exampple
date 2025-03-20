bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.A, function () {
    // send a string
    basic.showString("A")
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    // receive a string and shot it.
    msg = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    basic.showString(msg)
})
function searchObject () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        bluetooth.uartWriteString("" + huskylens.readeBox(1, Content1.xCenter))
    }
}
let msg = ""
bluetooth.startUartService()
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
basic.forever(function () {
    searchObject()
})
