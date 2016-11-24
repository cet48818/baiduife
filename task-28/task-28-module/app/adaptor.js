import * as Bus from './bus';
import * as Plane from './plane';

var receiveInitOrder = function(command) {
    // 飞船上用来转译init命令的模块
    var speedArr = [30, 50, 70];
    var powerArr = [5, 7, 9];
    var powerTypeArr = [2, 3, 4];
    var data = {
        index: command[0],
        speed: speedArr[command[1]],
        power: powerArr[command[1]],
        powerType: powerTypeArr[command[2]]
    }
    return data;
};

var handleCommand = function(index, command) {
    if (typeof command === 'object') { // 处理command传来的初始化飞船命令
        var planeStr = Number(index);
        var engineStr = Number(command.engine);
        var powerStr = Number(command.power);
        var typedArray = new Uint8Array([planeStr, engineStr, powerStr]);
        Bus.init(typedArray);
    } else if (typeof command === 'string') { // 将指挥官的起飞停止和自毁三个命令转换成二进制数组传给bus
        var num;
        switch (command) {
            case 'takeoff': num = 0;
                break;
            case 'stop': num = 1;
                break;
            case 'destroy': num = 2;
                break;
        }
        var typedArray = new Uint8Array([index, num]);
        Bus.emit(typedArray);
    }
};

var receiveHandleCommand = function(command) {
    // 帮助飞行器解析收到的二进制命令
    var index = command[0];
    switch (command[1]) {
        case 0: Plane.takeoff(index);
            break;
        case 1: Plane.stop(index);
            break;
        case 2: Plane.destroy(index);
            break;
    }
};

var monitorSignal = function(index, ref) {
    // 将飞船要传给bus的运行数据转换成二进制
    // 飞船/动力系统/能源系统/飞行状况/能源情况/初始化情况
    var planeNumber,
        engineType,
        powerType,
        takeoff,
        curPower,
        init;
    
    planeNumber = index;
    switch (ref.speed) {
        case 30: engineType = 0;
            break;
        case 50: engineType = 1;
            break;
        case 70: engineType = 2;
            break;
    }
    switch (ref.powerGene) {
        case 2: powerType = 0;
            break;
        case 3: powerType = 1;
            break;
        case 4: powerType = 2;
            break;
    }
    takeoff = ref.takeoff? 1: 0;
    curPower = ref.power;
    init = ref.init? 1: 0;
    var typedArray = new Uint8Array([planeNumber, engineType, powerType, takeoff, curPower, init]);
    return typedArray;
};

var transformBin2Obj = function(params) {
    // 帮助command模块将飞船传来的状态从二进制转换为对象
    var obj = {};
    obj.planeNumber = params[0];
    switch (params[1]) {
        case 0: obj.engineType = '前进号';
            break;
        case 1: obj.engineType = '奔腾号';
            break;
        case 2: obj.engineType = '超越号';
            break;
    }
    switch (params[2]) {
        case 0: obj.powerType = '劲量型';
            break;
        case 1: obj.powerType = '光能型';
            break;
        case 2: obj.powerType = '永久型';
            break;
    }
    obj.takeoff = params[3]? '飞行中': '停止中';
    obj.curPower = params[4];
    obj.init = params[5];
    return obj;
}
    
export {
        handleCommand,
        receiveInitOrder,
        receiveHandleCommand,
        monitorSignal,
        transformBin2Obj
    }