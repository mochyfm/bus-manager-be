"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ContainerProperties: function() {
        return ContainerProperties;
    },
    DataBaseConnectionConfig: function() {
        return DataBaseConnectionConfig;
    }
});
const ContainerProperties = {
    address: 'localhost',
    name: 'postgres-bus-manager',
    port: '5432',
    image: 'postgres',
    password: 'password'
};
const DataBaseConnectionConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'bus_manager',
    entities: [],
    synchronize: true
};
