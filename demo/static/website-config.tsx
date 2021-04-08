import { WebsiteConfig } from "../../static/website-config";

let websiteConfig: WebsiteConfig = {
    mode: "production",
    requirejs: {
        paths: {
            "url-pattern": "node_modules/url-pattern/lib/url-pattern"
        }
    },
    routers: {
        "/:pageName/:pageName(/:id)": { html: "preivew.html" }
    },

}

export default websiteConfig