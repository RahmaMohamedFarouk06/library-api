"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.10.0",
    "engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Book {\n  id          Int       @id @default(autoincrement())\n  title       String\n  author      String\n  description String?\n  publishedAt DateTime?\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Book\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"author\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"publishedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null,\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Book.findUnique\",\"Book.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Book.findFirst\",\"Book.findFirstOrThrow\",\"Book.findMany\",\"data\",\"Book.createOne\",\"Book.createMany\",\"Book.createManyAndReturn\",\"Book.updateOne\",\"Book.updateMany\",\"Book.updateManyAndReturn\",\"create\",\"update\",\"Book.upsertOne\",\"Book.deleteOne\",\"Book.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Book.groupBy\",\"Book.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"title\",\"author\",\"description\",\"publishedAt\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "PAsQChwAACwAMB0AAAQAEB4AACwAMB8CAAAAASABAC4AISEBAC4AISIBAC8AISNAADAAISRAADEAISVAADEAIQEAAAABACABAAAAAQAgChwAACwAMB0AAAQAEB4AACwAMB8CAC0AISABAC4AISEBAC4AISIBAC8AISNAADAAISRAADEAISVAADEAIQIiAAAyACAjAAAyACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAHHwIAAAABIAEAAAABIQEAAAABIgEAAAABI0AAAAABJEAAAAABJUAAAAABAQgAAAkAIAcfAgAAAAEgAQAAAAEhAQAAAAEiAQAAAAEjQAAAAAEkQAAAAAElQAAAAAEBCAAACwAwAQgAAAsAMAcfAgA8ACEgAQA4ACEhAQA4ACEiAQA5ACEjQAA6ACEkQAA7ACElQAA7ACECAAAAAQAgCAAADgAgBx8CADwAISABADgAISEBADgAISIBADkAISNAADoAISRAADsAISVAADsAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBxUAADMAIBYAADQAIBcAADcAIBgAADYAIBkAADUAICIAADIAICMAADIAIAocAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhAQAcACEiAQAdACEjQAAeACEkQAAfACElQAAfACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAocAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhAQAcACEiAQAdACEjQAAeACEkQAAfACElQAAfACENFQAAIQAgFgAAKwAgFwAAIQAgGAAAIQAgGQAAIQAgJgIAAAABJwIAAAAEKAIAAAAEKQIAAAABKgIAAAABKwIAAAABLAIAAAABLQIAKgAhDhUAACEAIBgAACkAIBkAACkAICYBAAAAAScBAAAABCgBAAAABCkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BACgAIS4BAAAAAS8BAAAAATABAAAAAQ4VAAAkACAYAAAnACAZAAAnACAmAQAAAAEnAQAAAAUoAQAAAAUpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAmACEuAQAAAAEvAQAAAAEwAQAAAAELFQAAJAAgGAAAJQAgGQAAJQAgJkAAAAABJ0AAAAAFKEAAAAAFKUAAAAABKkAAAAABK0AAAAABLEAAAAABLUAAIwAhCxUAACEAIBgAACIAIBkAACIAICZAAAAAASdAAAAABChAAAAABClAAAAAASpAAAAAAStAAAAAASxAAAAAAS1AACAAIQsVAAAhACAYAAAiACAZAAAiACAmQAAAAAEnQAAAAAQoQAAAAAQpQAAAAAEqQAAAAAErQAAAAAEsQAAAAAEtQAAgACEIJgIAAAABJwIAAAAEKAIAAAAEKQIAAAABKgIAAAABKwIAAAABLAIAAAABLQIAIQAhCCZAAAAAASdAAAAABChAAAAABClAAAAAASpAAAAAAStAAAAAASxAAAAAAS1AACIAIQsVAAAkACAYAAAlACAZAAAlACAmQAAAAAEnQAAAAAUoQAAAAAUpQAAAAAEqQAAAAAErQAAAAAEsQAAAAAEtQAAjACEIJgIAAAABJwIAAAAFKAIAAAAFKQIAAAABKgIAAAABKwIAAAABLAIAAAABLQIAJAAhCCZAAAAAASdAAAAABShAAAAABSlAAAAAASpAAAAAAStAAAAAASxAAAAAAS1AACUAIQ4VAAAkACAYAAAnACAZAAAnACAmAQAAAAEnAQAAAAUoAQAAAAUpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAmACEuAQAAAAEvAQAAAAEwAQAAAAELJgEAAAABJwEAAAAFKAEAAAAFKQEAAAABKgEAAAABKwEAAAABLAEAAAABLQEAJwAhLgEAAAABLwEAAAABMAEAAAABDhUAACEAIBgAACkAIBkAACkAICYBAAAAAScBAAAABCgBAAAABCkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BACgAIS4BAAAAAS8BAAAAATABAAAAAQsmAQAAAAEnAQAAAAQoAQAAAAQpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQApACEuAQAAAAEvAQAAAAEwAQAAAAENFQAAIQAgFgAAKwAgFwAAIQAgGAAAIQAgGQAAIQAgJgIAAAABJwIAAAAEKAIAAAAEKQIAAAABKgIAAAABKwIAAAABLAIAAAABLQIAKgAhCCYIAAAAAScIAAAABCgIAAAABCkIAAAAASoIAAAAASsIAAAAASwIAAAAAS0IACsAIQocAAAsADAdAAAEABAeAAAsADAfAgAtACEgAQAuACEhAQAuACEiAQAvACEjQAAwACEkQAAxACElQAAxACEIJgIAAAABJwIAAAAEKAIAAAAEKQIAAAABKgIAAAABKwIAAAABLAIAAAABLQIAIQAhCyYBAAAAAScBAAAABCgBAAAABCkBAAAAASoBAAAAASsBAAAAASwBAAAAAS0BACkAIS4BAAAAAS8BAAAAATABAAAAAQsmAQAAAAEnAQAAAAUoAQAAAAUpAQAAAAEqAQAAAAErAQAAAAEsAQAAAAEtAQAnACEuAQAAAAEvAQAAAAEwAQAAAAEIJkAAAAABJ0AAAAAFKEAAAAAFKUAAAAABKkAAAAABK0AAAAABLEAAAAABLUAAJQAhCCZAAAAAASdAAAAABChAAAAABClAAAAAASpAAAAAAStAAAAAASxAAAAAAS1AACIAIQAAAAAAAAExAQAAAAEBMQEAAAABATFAAAAAAQExQAAAAAEFMQIAAAABMgIAAAABMwIAAAABNAIAAAABNQIAAAABAAAAAAUVAAYWAAcXAAgYAAkZAAoAAAAAAAUVAAYWAAcXAAgYAAkZAAoBAgECAwEFBgEGBwEHCAEJCgEKDAILDQMMDwENEQIOEgQREwESFAETFQIaGAUbGQs"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map