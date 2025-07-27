import { useRouteError } from "react-router";

const Error = () => {
    const err = useRouteError();
    return (
        <>
            <h1>Oops! {err.status} : {err?.error?.message}</h1>
        </>
    )
}

export default Error;