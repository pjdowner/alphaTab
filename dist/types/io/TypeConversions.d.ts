/**
 * @target web
 */
export declare class TypeConversions {
    private static _conversionBuffer;
    private static _conversionByteArray;
    private static _dataView;
    static float64ToBytes(v: number): Uint8Array;
    static bytesToFloat64(bytes: Uint8Array): number;
    static uint16ToInt16(v: number): number;
    static int16ToUint32(v: number): number;
    static int32ToUint16(v: number): number;
    static int32ToInt16(v: number): number;
    static int32ToUint32(v: number): number;
    static uint8ToInt8(v: number): number;
}
