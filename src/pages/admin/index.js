import { Link } from "@chakra-ui/react";

export default function AdminIndex (){
    return(
        <div>
            <Link href="/admin/create"><h1>create</h1></Link>
            <Link href="/admin/edit"><h1>edit</h1></Link>
            <Link href="/admin/delete"><h1>delete</h1></Link>
        </div>
    )
}