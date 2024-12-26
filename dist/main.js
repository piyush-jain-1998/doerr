"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_ws_1 = require("@nestjs/platform-ws");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    app.useWebSocketAdapter(new platform_ws_1.WsAdapter(app));
    await app.listen(port);
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.HOST || 'localhost';
    console.log(`Server started on ${protocol}://${host}:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map