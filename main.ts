//% color = "#00C7D5" weight = 5 icon = "\uf1d0"
namespace LTD381 {
    const LER381_ADDR = 0x53
    const LTR381_MAIN_CTRL = 0x00
    const LTR381_ALS_CS_MEAS_RATE = 0x04
    const LTR381_ALS_CS_GAIN = 0x05


    const LTR381_DATA_GREEN_0 = 0x0D
    const LTR381_DATA_GREEN_1 = 0x0E
    const LTR381_DATA_GREEN_2 = 0x0F
    const LTR381_DATA_RED_0 = 0x10
    const LTR381_DATA_RED_1 = 0x11
    const LTR381_DATA_RED_2 = 0x12
    const LTR381_DATA_BLUE_0 = 0x13
    const LTR381_DATA_BLUE_1 = 0x14
    const LTR381_DATA_BLUE_2 = 0x15

    export enum RGBList {
        R = 0x1,
        G = 0x2,
        B = 0x3
    }

    let initialized = false

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(reg: number) {
        pins.i2cWriteNumber(LER381_ADDR, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(LER381_ADDR, NumberFormat.UInt8BE);
        return val;
    }
    function init() {
        basic.pause(100)
        i2cwrite(LER381_ADDR, LTR381_ALS_CS_MEAS_RATE, 0x22)
        i2cwrite(LER381_ADDR, LTR381_ALS_CS_GAIN, 0x01)
        i2cwrite(LER381_ADDR, LTR381_MAIN_CTRL, 0x06)
        initialized = true
    }
    //% block="%state value"
    export function rgb(state: RGBList): number {
        if (initialized) {
            init()
        }
        switch (state) {
            case RGBList.R:
                let val_0 = i2cread(LTR381_DATA_RED_0)
                let val_1 = i2cread(LTR381_DATA_RED_1)
                let val_2 = i2cread(LTR381_DATA_RED_2) & 0x0F
                return (val_2 * 256 * 256) + (val_1 * 256) + val_0
            case RGBList.B:

            case RGBList.G:

        }
        return 0
    }

}