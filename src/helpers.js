import {OrderedMap} from 'immutable';

//проверить Map/OrderMap
export function arrToMap(arr, DataRecord = OrderedMap) {
    return arr.reduce((acc, item) => acc.set(item.id, new DataRecord(item)), new OrderedMap({}));
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray();
}