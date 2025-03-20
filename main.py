def on_button_pressed_a():
    # send a string
    basic.show_string("A")
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_uart_data_received():
    global msg
    # receive a string and shot it.
    msg = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
    basic.show_string(msg)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.NEW_LINE),
    on_uart_data_received)

def searchObject():
    huskylens.request()
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        bluetooth.uart_write_string( str((huskylens.reade_box(1, Content1.X_CENTER))))
msg = ""
bluetooth.start_uart_service()
huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)