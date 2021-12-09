import React from "react";

const NewsItem = (props) =>  {

    let {title, description, imageUrl, newsUrl, author, date} = props;
    
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{title} <span className="badge bg-success rounded-pill">New</span> </h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-muted">by {author?author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem