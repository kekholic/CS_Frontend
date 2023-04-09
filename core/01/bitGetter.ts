// Написать функцию, которая принимает Uint8Array и позволяет обратиться к биту конкретного элемента
class ProcessUint8Array {
    uint8Array: Uint8Array;
    maxSize: number;

    constructor(uint8Array: Uint8Array) {
        this.uint8Array = uint8Array;
        this.maxSize = uint8Array.length;
    }

    checkCorrectRange(index: number, num_bit: number): void {
        if (index < 0 || index >= this.maxSize) {
            throw new Error(
                `Допустимо использовать индексы в диапазоне от 0 до ${this.maxSize - 1} включительно.`,
            );
        }
        if (num_bit < 0 || num_bit > 7) {
            throw new Error('Uint8Array может содержать не более 8 битов.');
        }
    }

    get(index: number, num_bit: number): 1 | 0 {
        this.checkCorrectRange(index, num_bit);
        return (this.uint8Array[index] & (1 << num_bit)) != 0 ? 1 : 0;
    }

    set(index: number, num_bit: number, value: 1 | 0) {
        this.checkCorrectRange(index, num_bit);
        if (value === 0) {
            this.uint8Array[index] = this.uint8Array[index] & ~(1 << num_bit);
        }

        if (value === 1) {
            this.uint8Array[index] = this.uint8Array[index] | (1 << num_bit);
        }
    }
}

const createBitGetter = (uint8Array: Uint8Array) => {
    return new ProcessUint8Array(uint8Array);
};

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0

//Расширить функцию из прошлого задания возможностью изменять значение конкретного бита


const createBitAccessor = (uint8Array: Uint8Array) => {
    return new ProcessUint8Array(uint8Array);
};

const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

console.log(bitAccessor.get(0, 1)); // 1
bitAccessor.set(0, 1, 0); //
console.log(bitAccessor.get(0, 1)); // 0

console.log(bitAccessor.get(0, 7)); // 0
bitAccessor.set(0, 7, 1); //
console.log(bitAccessor.get(0, 7)); // 1