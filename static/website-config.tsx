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

    /** 初始化的模块，requirejs 模块名或者路径 */
    init?: string,
}


let websiteConfig: WebsiteConfig = {
    mode: "production",
}

export default websiteConfig