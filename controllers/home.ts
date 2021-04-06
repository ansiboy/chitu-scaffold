import { controller, action, serverContext, ServerContext, ContentResult } from "maishu-node-mvc";
import * as path from "path";
import * as fs from "fs";
import { errors } from "../errors";

let htmlPath = path.join(__dirname, "../static/index.html");

@controller("/")
export default class HomeController {
    @action("*.ct", "*.ct/*")
    g(@serverContext ctx: ServerContext) {
        if (!fs.existsSync(htmlPath))
            throw errors.physicalPathNotExists(htmlPath);

        let buffer = fs.readFileSync(htmlPath);
        let html = buffer.toString();
        return html;
    }
}