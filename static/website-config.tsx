export interface WebsiteConfig {
    requirejs?: {
        shim?: {
            [key: string]: { deps?: string[], exports?: string, }
        },
        paths?: { [key: string]: string },
        context?: string,
    },
    containers?: { [pageName: string]: string },
    mode?: "production" | "development"
}


let websiteConfig: WebsiteConfig = {
    mode: "production",
}

export default websiteConfig