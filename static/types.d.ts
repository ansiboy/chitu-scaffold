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

export interface ContextData {

}