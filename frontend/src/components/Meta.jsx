import Helmet from "react-helmet";

const Meta = ({ title, desc, keywords }) => {
    return (
        <Helmet>
            <title>{title || "MERN BLOG"}</title>
            <meta name='description' content={desc} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}


export default Meta;