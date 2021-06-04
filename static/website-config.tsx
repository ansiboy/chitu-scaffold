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

    routers?: { [pagePath: string]: { [key: string]: string } }

}

let websiteConfig: WebsiteConfig = {
    mode: "development",
    requirejs: {
        paths: {
        }
    }
}



export default websiteConfig