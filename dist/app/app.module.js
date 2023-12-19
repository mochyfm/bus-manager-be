"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _postgresconfig = require("../config/postgres.config");
const _roleentity = require("./entities/Role/role.entity");
const _userentity = require("./entities/User/user.entity");
const _userservice = require("./services/user.service");
const _roleservice = require("./services/role.service");
const _usercontroller = require("./controller/user.controller");
const _rolecontroller = require("./controller/role.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'password',
                database: 'bus_manager',
                entities: [
                    _userentity.User,
                    _roleentity.Role
                ],
                synchronize: true
            })
        ],
        controllers: [
            _usercontroller.UserController,
            _rolecontroller.RoleController
        ],
        providers: [
            _postgresconfig.DockerService,
            _userservice.UserService,
            _roleservice.RoleService
        ]
    })
], AppModule);
