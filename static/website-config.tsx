export interface WebsiteConfig {
    requirejs?: {
        shim?: {
            [key: string]: { deps?: string[], exports?: string, }
        },
        paths?: { [key: string]: string },
        context?: string,
        baseUrl?: string,
    },
    containers?: { [pageName: string]: string },
    mode?: "production" | "development",

    routers?: { [pagePath: string]: string }

}


let websiteConfig: WebsiteConfig = {
    mode: "development",
    requirejs: {
        paths: {
            "url-pattern": "node_modules/url-pattern/lib/url-pattern"
        }
    }
}

export default websiteConfig