import { WebsiteConfig } from "../../static/website-config";

let websiteConfig: WebsiteConfig = {
    mode: "development",
    requirejs: {
        paths: {
            "url-pattern": "node_modules/url-pattern/lib/url-pattern"
        }
    },
    routers: {
        "test/a": ":id"
    }
}

export default websiteConfig