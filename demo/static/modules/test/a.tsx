import { PageProps } from "maishu-chitu-react";
import * as React from "react";
import { router } from "../../decorators";

export default function (props: PageProps) {
    return <h1>ID:{props.data.id}</h1>
}