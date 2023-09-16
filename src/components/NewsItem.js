import React from 'react'
import { Link } from "react-router-dom";
const NewsItem = (props)=>
 {
        let { title, description, imageUrl, newsUrl, publishDate, source } = props;
        return (
            <div>
                <div className="card">
                    <img src={imageUrl ? imageUrl : "https://variety.com/wp-content/uploads/2020/05/featured_cord-cutting_2.jpg?w=1000&h=563&crop=1"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left:'94%'}}>
                            {source.substr(0,10)}...
                           
                        </span>
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p><small className="text-muted"><strong>Published At : </strong> {new Date(publishDate).toDateString()}</small> </p>
                        <Link rel="noopener noreferrer" to={newsUrl} className="btn btn-sm btn-primary" target='_blank'>Read More..</Link>
                    </div>
                </div>
            </div>
        )
    }


export default NewsItem
